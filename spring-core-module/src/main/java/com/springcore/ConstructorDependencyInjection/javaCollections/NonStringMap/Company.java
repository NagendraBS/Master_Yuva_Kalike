package com.springcore.ConstructorDependencyInjection.javaCollections.NonStringMap;

import java.util.Map;
import java.util.Map.Entry;

public class Company {

	//Member Variable
	private Map<Employee, Address> employees;

	
	public Company() {
		super();
	}


	public Map<Employee, Address> getEmployees() {
		return employees;
	}


	public void setEmployees(Map<Employee, Address> employees) {
		this.employees = employees;
	}


	//method
	public void display() {
		
		//Iterating over Map using for each Loop
		for(Entry<Employee, Address> entry : employees.entrySet())
		
			System.out.println("EmployeeData -> " +entry.getKey().toString() 
					+ "Address -> " + entry.getValue().toString());
	}
	
}
