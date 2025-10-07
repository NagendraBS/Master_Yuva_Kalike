package com.java.staticKeyword;


	class Employee{
		// Static variable to maintain a shared counter
		static int employeeCount = 0;
		
		// Instance variable
		String name;

	    // Constructor increments the static counter
		public Employee(String name) {
			super();
			this.name = name;
			employeeCount++;   // Shared by all instances
		}
		
		
		static int getEmployeeCount() {
			return getEmployeeCount();
		}
		
	}
	

public class StaticVariable {

	public static void main(String[] args) {
        // Creating multiple objects
		
		Employee e1 = new Employee("Alice");
		Employee e2 = new Employee("Bob");
		Employee e3 = new Employee("Charlie");
		
        // Accessing static variable
		System.out.println("Employee Count (from class): " + Employee.getEmployeeCount());   // 3
		System.out.println("Employee Count (from instance): " + e1.employeeCount);   // 3
		
		
	}
	
}
