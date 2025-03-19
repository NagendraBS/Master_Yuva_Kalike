package com.java.ObjectOrientedProgramming;

import com.java.MethodCalling.StaticMethods;

public class Nag {

    // Properties Declared
	static String Employee_name;
	static float Employee_salary;
	
	
    // Methods Declared

	static void set(String n, float p) {
		Employee_name = n;
		Employee_salary = p;
		
	}
	
	static void get() {
		System.out.println("Employee name is : " + Employee_name);
		System.out.println("Employee Salary is : " + Employee_salary);
	}
	
	
	
	//Main Method
	public static void main(String[] args) {
		
		Nag.set("Yuvaraj", 10000.0f);
		Nag.get();
		
		
	}

}
