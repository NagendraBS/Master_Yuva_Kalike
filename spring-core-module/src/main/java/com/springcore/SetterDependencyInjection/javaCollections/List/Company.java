package com.springcore.SetterDependencyInjection.javaCollections.List;

import java.util.List;

public class Company {

	//Members variables
	private String companyName;
	private List<String> employees;
	
	
	
	//Getters and Setters
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public List<String> getEmployees() {
		return employees;
	}
	public void setEmployees(List<String> employees) {
		this.employees = employees;
	}
	
	
	//Method
	public void display() {
		
		System.out.println("Company" + companyName);
		
		System.out.println("Employee List" + employees);
		
		for(String emp : employees) {
			System.out.println("-" + emp);
		}
		
	}
	
	
	
	
	
}
