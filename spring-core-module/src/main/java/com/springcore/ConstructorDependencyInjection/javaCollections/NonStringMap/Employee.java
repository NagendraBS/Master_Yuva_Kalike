package com.springcore.ConstructorDependencyInjection.javaCollections.NonStringMap;

public class Employee {

	//data Members
	private String name;
	private String employeeID;
	private String department;
	
	
	
	public Employee() {
		super();
	}


	public Employee(String name, String employeeID, String department) {
		
		//this Key Refers to Current instance itself
		this.name = name;
		this.employeeID = employeeID;
		this.department = department;
		
	}
	
	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmployeeID() {
		return employeeID;
	}


	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public String toString() {
		
		return("[" + name + "," + employeeID + "," + department + "]") ;
	}
	
	
}
