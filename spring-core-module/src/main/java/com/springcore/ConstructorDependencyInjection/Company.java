package com.springcore.ConstructorDependencyInjection;

import java.util.Map;

public class Company {
	

		 // Class member variables
		 private Map<String, String> employees;

		 // Constructor
		 public Company(Map<String, String> employees)
		 {
		     // this keyword refers to current instance itself
		     this.employees = employees;
		 }

		 // Method
		 public void display()
		 {
		     for (Map.Entry<String, String> entry :
		          employees.entrySet()) {

		         System.out.println(
		             "Employee Id ->" + entry.getKey() + ","
		             + " Department->" + entry.getValue());
		     }
		 }
		}

