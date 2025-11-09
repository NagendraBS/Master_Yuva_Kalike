package com.gx.fileprocessor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import com.gx.fileprocessor.app.model.FileStatus;

public interface FileStatusRepository extends JpaRepository<FileStatus, Long> {

	
	@Query("SELECT f FROM FileStatus f WHERE" + "(:filename IS NULL OR f.filename LIKE %:filename%) AND " 
				+ "(:type IS NULL OR f.type = :type) AND " 
				+ "(:status IS NULL OR f.status = :status)")
	List<FileStatus> findByFilenameAndTypeAndStatus(
			
			@Param("filename")String filename, 
			@Param("type")String type,
			@Param("status") String status);
	
	
	
}



