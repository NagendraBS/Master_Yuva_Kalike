package com.gx.fileprocessor.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

	private String inputFolder;
	
	public String getInputFolder() {
		return inputFolder;
	}
	
	public void setInputFolder(String inputFolder) {
		this.inputFolder = inputFolder;
		}
	
}
