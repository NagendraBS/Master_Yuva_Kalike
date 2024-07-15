package com.springcore.ApplicationContext.BeanType;

public class Student {

	//member variables
	private int rollno;
	private String name;
	
	//constructor 1
	public Student () {
		
	}
	
	public Student(int rollno, String name) {
		this.rollno= rollno;
		this.name=name;
		
	}
	
	// Method of this class
	  // @Override
	  public String toString() {

	    return "Student{" + "rollno=" + rollno + ", name='" + name + '\'' + '}';
	  }
	
	
}
