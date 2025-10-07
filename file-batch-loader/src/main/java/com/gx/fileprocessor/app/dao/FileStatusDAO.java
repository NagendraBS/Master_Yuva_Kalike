package com.gx.fileprocessor.app.dao;

import java.util.List;

import com.gx.fileprocessor.app.model.FileStatus;



public interface FileStatusDAO {

	List<FileStatus> getFileStatus(String filename, String type, String status);
	
	FileStatus save(FileStatus fileStatus);
	
	
}
