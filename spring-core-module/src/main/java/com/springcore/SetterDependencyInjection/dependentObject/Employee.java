package com.springcore.SetterDependencyInjection.dependentObject;

public class Employee {

	private String name;
	private String employeeID;
	private String department;

	private Address address;

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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Employee [name=" + name + ", employeeID=" + employeeID + ", department=" + department + ", address="
				+ address + "]";
	}


}
