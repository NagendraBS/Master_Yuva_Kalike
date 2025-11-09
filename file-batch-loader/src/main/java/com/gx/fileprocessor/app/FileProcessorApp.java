package com.gx.fileprocessor.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FileProcessorApp {

	public static void main(String[] args) {
		
		SpringApplication.run(FileProcessorApp.class, args);
		
		System.out.println("------------------- Files Processor Started --------------------");
		
	}
	

}
