package com.gx.fileprocessor.app.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.model.PatientRecord;


public interface PatientRecordDAO {
	
	List<PatientRecord> getRecordsByFilename(String sourceFilename);
	
	List<PatientRecord> getFileByFilenameAndTypeAndStatus(String sourceFilename, boolean isInsured, String status);
	
	PatientRecord save(PatientRecord record);


}
