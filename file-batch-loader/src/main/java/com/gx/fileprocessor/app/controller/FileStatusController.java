package com.gx.fileprocessor.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gx.fileprocessor.app.dao.FileStatusDAO;
import com.gx.fileprocessor.app.model.FileStatus;
import com.gx.fileprocessor.app.repository.FileStatusRepository;

@RestController
@RequestMapping("/api/files")
public class FileStatusController {

	private FileStatusDAO fileStatusDAO;


	public FileStatusController(FileStatusDAO fileStatusDAO
								) {
		this.fileStatusDAO = fileStatusDAO;

	}

	// Get all file processing status records
	//   GET  /api/files/status?filename=CSVFile.csv&type=csv&status=SUCCESS

	@GetMapping("/status")
	public List<FileStatus> getFileStatuses(

			@RequestParam(defaultValue = "") String filename, 
			@RequestParam(defaultValue = "") String type,
			@RequestParam(defaultValue = "") String status

	) {

		return fileStatusDAO.getFileStatus(filename.trim(),
				type.trim(), status.trim());
	}


}
