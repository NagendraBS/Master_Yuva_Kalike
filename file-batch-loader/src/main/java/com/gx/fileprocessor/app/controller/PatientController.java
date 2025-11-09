package com.gx.fileprocessor.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gx.fileprocessor.app.dao.FileStatusDAO;
import com.gx.fileprocessor.app.dao.PatientRecordDAO;
import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.model.PatientRecord;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
	
	private PatientRecordDAO patientRecordDAO;
	

	public PatientController(PatientRecordDAO patientRecordDAO) {
		this.patientRecordDAO = patientRecordDAO;

	}
	
		// Get all patient records from DB by source file name
		//   GET    --  /api/patient/data?sourceFilename=CSVFile.csv

		@GetMapping("/data")
		public List<PatientRecord> getRecordsByFilename(@RequestParam String sourceFilename) {
			return patientRecordDAO.getRecordsByFilename(sourceFilename.trim());
		}
		
		
		
		// Get all file processing status records
		//   GET  /api/patient/filter?sourceFilename=CSVFile.csv&type=csv&status=ACTIVE
		
		@GetMapping("/filter")
		public List<PatientRecord> getFileByFilenameAndTypeAndStatus(

				@RequestParam(defaultValue = "") String sourceFilename, 
				@RequestParam(defaultValue = "") boolean isInsured,
				@RequestParam(defaultValue = "") String status

		) {

			return patientRecordDAO.getFileByFilenameAndTypeAndStatus(sourceFilename.trim(), isInsured, status.trim());
		}

		
	
}
