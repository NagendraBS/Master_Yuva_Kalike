package com.gx.fileprocessor.app.serviceImpl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.item.file.separator.RecordSeparatorPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.model.PatientRecord;
import com.gx.fileprocessor.app.model.ProcessResult;
import com.gx.fileprocessor.app.dao.FileStatusDAO;
import com.gx.fileprocessor.app.dao.PatientRecordDAO;
import com.gx.fileprocessor.app.service.FileProcessorService;
import com.gx.fileprocessor.app.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;



@Service
public class FileProcessorServiceImpl implements FileProcessorService {

	@Autowired
	private PatientRecordDAO patientRecordDAO;
	
	@Autowired
    private FileStatusDAO fileStatusDAO;

    private static final Logger log = LoggerFactory.getLogger(FileProcessorServiceImpl.class);
    
    @Autowired
    private ObjectMapper objectMapper;    
    
    @Value("${file.archive-folder}")
    private String archiveFolderPath;

    @Value("${file.error-folder}")
    private String errorFolderPath;
    

    @Autowired
    public FileProcessorServiceImpl(PatientRecordDAO patientRecordDAO, FileStatusDAO fileStatusDAO) {
        this.patientRecordDAO = patientRecordDAO;
        this.fileStatusDAO = fileStatusDAO;
    }
    
    
    @Override
    public ProcessResult processFile(File file, String fileType) {
    	
    	ProcessResult result;
    	
        if ("csv".equalsIgnoreCase(fileType)) {
            result = processCSVfile(file);
        } else if ("json".equalsIgnoreCase(fileType) || "txt".equalsIgnoreCase(fileType)) {
            result =  processJSONfile(file); // Handles both .json and .txt
        } else {
            log.error("Unsupported file type: {}", fileType);
            return new ProcessResult(new ArrayList<>(), 0, 1);
        }
        
        
        if (result.getFailedCount() == 0) {
            FileUtils.moveFileToFolder(file, archiveFolderPath);
            log.info("File moved to archive: {}", file.getName());
        } else {
            // If failed, move to error folder
            FileUtils.moveFileToFolder(file, errorFolderPath);
            log.error("File moved to error folder: {}", file.getName());
        }
        
		return result;
    }

    @Override
    public ProcessResult processCSVfile(File file) {
        List<PatientRecord> records = new ArrayList<>();
        int successCount = 0;
        int failedCount = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            reader.readLine();  // skips the first line the headerline 
            
            int lineNum = 1;

            
            while ((line = reader.readLine()) != null) {
                try {
                    String[] values = line.split(",");
                    if (values.length == 8) {
                        PatientRecord record = new PatientRecord();
                        record.setPatientId(values[0]);
                        record.setName(values[1]);
                        record.setAge(Integer.parseInt(values[2]));
                        record.setCondition(values[3]);

                        try {
                            // Use the custom parseDate method to handle multiple date formats
                            LocalDate lastVisitDate = parseDate(values[4]);  // The date is in column 4
                            record.setLastVisitDate(lastVisitDate);
                        } catch (DateTimeParseException e) {
                            log.error("Invalid date format for patient {} on line {}: {}", values[0], lineNum, values[4]);
                            failedCount++;
                            continue;  // Skip this record and move to the next one
                        }

                        record.setInsured(Boolean.parseBoolean(values[5]));
                        record.setPharmacyName(values[6]);
                        record.setSourceFilename(file.getName());
                        record.setStatus(values[7]);

                        patientRecordDAO.save(record);
                        records.add(record);
                        successCount++;
                        
                        log.info("Successfully processed CSV line {}: {}", lineNum, record.getPatientId());
                        
                    } else {
                    	failedCount++;
                        log.error("Invalid CSV line {} in file {}: {}", lineNum, file.getName(), line);
                    }
                } catch (Exception parseError) {
                	failedCount++;
                    log.error("Error parsing CSV line {} in file {}: {}", lineNum, file.getName(), line, parseError);
                }
                lineNum++;
            }
        } catch (IOException e) {
            log.error("Failed to read CSV file: {} - {}", file.getName(), e.getMessage(), e);
        }

        saveFileStatus(file.getName(), "csv", successCount, failedCount);
        return new ProcessResult(records, successCount, failedCount);
    }

    
    
    private LocalDate parseDate(String dateString) {
        List<DateTimeFormatter> formatters = List.of(
            DateTimeFormatter.ofPattern("dd-MM-yyyy"),  
            DateTimeFormatter.ofPattern("M/d/yyyy"),    
            DateTimeFormatter.ofPattern("dd/MM/yyy")
        );
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(dateString, formatter);
            } catch (DateTimeParseException e) {
                // Ignore and try next format
            }
        }
        throw new DateTimeParseException("Invalid date format: " + dateString, dateString, 0);
    }
    
    
    
    
    @Override
    public ProcessResult processJSONfile(File file) {
        List<PatientRecord> records = new ArrayList<>();
        int successCount = 0;
        int failedCount = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        	            
            String line;

            while ((line = reader.readLine()) != null) {
            
            	try {
					line = line.trim();
					
					if(!line.isEmpty()) {
						
	                    // Parse the line as a single JSON object
						PatientRecord record = objectMapper.readValue(line, PatientRecord.class);
						
	                    // Set the filename for the record (for tracking purposes)
						record.setSourceFilename(file.getName());
						
	                    // Save the record to the database
						patientRecordDAO.save(record);
						records.add(record);
						successCount++;
						log.info("Saved record for patient: {}", record.getPatientId());
						
					}
            		
				} catch (Exception e) {
					// Handling errors during parsing or saving the record, increment the failed count
	                failedCount++;
	                log.error("Failed to process or save patient record from line: {}", line, e);				}

            }

        } catch (IOException e) {
            log.error("Could not parse .json/.txt file {}: {}", file.getName(), e.getMessage(), e);
        }

        saveFileStatus(file.getName(), "json", successCount, failedCount);
        return new ProcessResult(records, successCount, failedCount);
    }

    private void saveFileStatus(String filename, String fileType, int successCount, int failedCount) {
        FileStatus fileStatus = new FileStatus();
        fileStatus.setFilename(filename);
        fileStatus.setType(fileType);
        fileStatus.setExecutionTime(LocalDateTime.now());
        fileStatus.setSuccessCount(successCount);
        fileStatus.setFailedCount(failedCount);
        fileStatus.setStatus(failedCount > 0 ? (successCount > 0 ? "PARTIAL_SUCCESS" : "FAILED") : "SUCCESS");

        fileStatusDAO.save(fileStatus);
        log.info("File {} processed: {} success, {} failed", filename, successCount, failedCount);
    }
}