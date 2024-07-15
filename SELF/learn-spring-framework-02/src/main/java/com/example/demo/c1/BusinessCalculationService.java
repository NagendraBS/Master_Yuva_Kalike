package com.example.demo.c1;

import java.util.Arrays;

import org.springframework.stereotype.Component;


@Component
public class BusinessCalculationService {

//DataService is A Dependency for BusinessCalculationClass	
	private DataService dataService;
	
	
	//Constructor
	public BusinessCalculationService(DataService dataService) {
		
		super();
		this.dataService = dataService;
	}

	
	public int findMax() {
		
		return Arrays.stream(dataService.retriveData()).max().orElse(0);
	}
	

}
