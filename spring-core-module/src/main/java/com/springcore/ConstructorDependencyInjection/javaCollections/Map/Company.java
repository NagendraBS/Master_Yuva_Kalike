package com.springcore.ConstructorDependencyInjection.javaCollections.Map;

import java.util.Map;
import java.util.Map.Entry;

public class Company {

	//Class memeber variable
	private Map<String, String> employees;

	//Constructor
	public Company(Map<String, String> employees) {
		super();
		this.employees = employees;
	}
	
	
	public void show() {
		
		for(Entry<String, String> entry : employees.entrySet()) {
			
			System.out.println("Employee ID :" + entry.getKey() + ", " + "Department" +entry.getValue());
		}
		
	}
	
	
}
