package com.springcore.ApplicationContext;

public class Student {

	//member variables
	private int id;
	private String name;
	
	//constructor 1
	public Student () {
		
	}
	
	public Student(int id, String name) {
		this.id= id;
		this.name=name;
		
	}
	
	// Method of this class
	  // @Override
	  public String toString() {

	    return "Student{" + "id=" + id + ", name='" + name + '\'' + '}';
	  }
	
	
}
