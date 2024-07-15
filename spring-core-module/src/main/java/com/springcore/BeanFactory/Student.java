package com.springcore.BeanFactory;

public class Student {

	
	//Member Variables
	private String name;
	private String age;

	
	// constructor 1
	public Student() {

	}

	//constructor 2
	public Student(String name, String age) {
		this.name=name;
	    this.age=age;
	}
	
	//Method inside POJO Class
	
	public String toString() {
		return "Student{" + "name='" + name + '\'' + 
				", age='" + age + '\'' + '}';
		
	}
	
}
