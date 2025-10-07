package com.gx.fileprocessor.app.daoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gx.fileprocessor.app.dao.PatientRecordDAO;
import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.model.PatientRecord;
import com.gx.fileprocessor.app.repository.FileStatusRepository;
import com.gx.fileprocessor.app.repository.PatientRecordRepository;



@Component
public class PatientRecordDAOImpl implements PatientRecordDAO {

	@Autowired
	private PatientRecordRepository patientRecordRepository;
	
	
	@Override
	public List<PatientRecord> getRecordsByFilename(String sourceFilename) {

		return patientRecordRepository.findBySourceFilename(sourceFilename);
	}
	
	@Override
	public List<PatientRecord> getFileByFilenameAndTypeAndStatus(String sourceFilename, boolean isInsured, String status) {
		
		return patientRecordRepository.findByFilenameAndTypeAndStatus(sourceFilename, isInsured, status);
	}

	@Override
	public PatientRecord save(PatientRecord record) {

		return patientRecordRepository.save(record);
	}

	
	
}
