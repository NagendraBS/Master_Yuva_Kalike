package com.gx.fileprocessor.app.batch;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.gx.fileprocessor.app.service.FileProcessorService;
import com.gx.fileprocessor.app.util.FileUtils;

@Component
public class FileBatchLoader {

	// FileBatchLoader is designed to periodically scan a folder and process files
	// based on their type.

	@Value("${file.input-folder}")
	private String inputFolder;

	@Value("${file.archive-folder}")
	private String archiveFolder;

	@Value("${file.error-folder}")
	private String errorFolder;

	private final FileProcessorService fileProcessorService;

	public FileBatchLoader(FileProcessorService fileProcessorService) {
		this.fileProcessorService = fileProcessorService;
	}

	@Scheduled(fixedRate = 300000) // every 5 minutes (300,000 milliseconds).
	public void runBatchJob() {

		File folder = new File(inputFolder);

		if (!folder.exists() && !folder.isDirectory()) {
			System.err.println("Input folder not found: " + inputFolder);
			return;
		}

		File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".csv")
				|| name.toLowerCase().endsWith(".txt") || name.toLowerCase().endsWith(".json"));

		if (files == null || files.length == 0) {

			System.out.println("No Files Found to Process !");
			return;
		}

		for (File file : files) {

			String name = file.getName().toLowerCase();

			try {

				if (name.endsWith(".csv")) {
					System.out.println("Processing CSV File : " + file.getName());
					fileProcessorService.processFile(file, "csv");
				} else if (name.endsWith(".json") || name.endsWith(".txt")) {
					System.out.println("Processing JSON/Txt File : " + file.getName());
					fileProcessorService.processFile(file, "json");
				} else {
					System.out.println("UnSupported File Type : " + file.getName());
				}


			} catch (Exception e) {

				System.out.println("Failed to process file : " + file.getName() + " --- " + e.getMessage());
				FileUtils.moveFileToErrorFolder(file, errorFolder);

			}

		}

	}

}
