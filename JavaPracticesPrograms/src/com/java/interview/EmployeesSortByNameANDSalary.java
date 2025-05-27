package com.java.interview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Employee{
	
	private String name;
	private double salary;
	
	
	
	Employee(String name, double salary){
		this.name = name;
		this.salary =salary;
	}
	
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public double getSalary() {
		return salary;
	}
	
	public void setSalary(double salary) {
		this.salary = salary;
	}


	@Override
	public String toString() {
		return name + " - "  + salary ;
	}
	
	
	
}


public class EmployeesSortByNameANDSalary {

	public static void main(String[] args) {

		List<Employee> employeesList = Arrays.asList(
				
				new Employee("Nagendra", 60000.05),
				new Employee("Aarav", 60000.35),
				new Employee("Lohith", 35000),
				new Employee("Srinivas", 80000),
				new Employee("Kalavathi", 85000)
				
				);
		
		
        // Sort by name, then by salary using Comparator
		
		Comparator<Employee> comparator = new Comparator<Employee>() {
			
			@Override
			public int compare(Employee e1, Employee e2) {

				int nameCompare = e1.getName().compareTo(e2.getName());
				int salaryCompare = Double.compare(e1.getSalary(), e2.getSalary());

				
				if(nameCompare != 0) {
					
					return nameCompare;
				}
				else {
					return salaryCompare;
				}
				
			}
			
		};
		
		
		Collections.sort(employeesList, comparator);
		
		
		for(Employee emp : employeesList) {
			System.out.println(emp);
		}
		
		
		
		
	}

}
