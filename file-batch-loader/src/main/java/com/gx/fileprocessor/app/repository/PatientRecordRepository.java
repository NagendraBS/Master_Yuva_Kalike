package com.gx.fileprocessor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.model.PatientRecord;
import java.util.List;


public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {

	
	List<PatientRecord> findBySourceFilename(String sourceFilename);
	
	
	
	@Query("SELECT p FROM PatientRecord p WHERE" + "(:sourceFilename IS NULL OR p.sourceFilename LIKE :sourceFilename) AND " 
			+ "(:isInsured IS NULL OR p.isInsured = :isInsured) AND " 
			+ "(:status IS NULL OR p.status = :status)")
	List<PatientRecord> findByFilenameAndTypeAndStatus(
		
		@Param("sourceFilename")String sourceFilename, 
		@Param("isInsured")boolean isInsured,
		@Param("status") String status);
	
	
}
