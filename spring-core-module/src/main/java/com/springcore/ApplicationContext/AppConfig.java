package com.springcore.ApplicationContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

	@Bean
	public Student student() {
		
		return new Student(1, "Yuvaraj");
	}
	
}
