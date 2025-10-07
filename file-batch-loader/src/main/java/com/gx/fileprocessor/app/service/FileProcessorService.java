package com.gx.fileprocessor.app.service;

import java.util.*;
import java.io.File;

import com.gx.fileprocessor.app.model.PatientRecord;
import com.gx.fileprocessor.app.model.ProcessResult;


public interface FileProcessorService {

	/* Process a file (either CSV or JSON format).
    * @param file - the file to process
     * @return List of processed PatientRecord objects
     */
	
	//Method Which Decide File Processing based On File type.
	ProcessResult processFile(File file, String fileType);
	
	
	
	/* Process a CSV file 
	    * @param file - the file to process
	    * @return List of processed PatientRecord objects
	     */
	
	// Handles the processing logic for CSV files
	ProcessResult processCSVfile(File file);
	
	/*  
	 * Process a JSON file.
    * @param file - the file to process
    * @return List of processed PatientRecord objects
	     */
	
	
	// Handles the processing logic for JSON files
	ProcessResult processJSONfile(File file);
	
}

