package com.gx.fileprocessor.app.daoImpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gx.fileprocessor.app.dao.FileStatusDAO;
import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.repository.FileStatusRepository;
import com.gx.fileprocessor.app.serviceImpl.FileProcessorServiceImpl;


@Component
public class FileStatusDAOImpl implements FileStatusDAO {

    private static final Logger log = LoggerFactory.getLogger(FileProcessorServiceImpl.class);

	
	@Autowired
	private FileStatusRepository fileStatusRepository;
	
	
	@Override
	public List<FileStatus> getFileStatus(String filename, String type, String status) {
		
		return fileStatusRepository.findByFilenameAndTypeAndStatus(filename, type, status);
	}

	@Override
	public FileStatus save(FileStatus fileStatus) {
		
		log.info(fileStatusRepository.count() + " ---------  Conuting Records----------");
		
		return fileStatusRepository.save(fileStatus);
	}

	
}
