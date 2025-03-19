package com.java.ObjectOrientedProgramming;

public class MethodPassing {

	//Properties Declared
	int id;
	String name;
	
	public void printStudent() {
		System.out.println("Students Id : " + id);
		System.out.println("Students name : " + name);
	}
	
	public static void main(String[] args) {
		
		MethodPassing mp = new MethodPassing();
		
		mp.id = 511;
		mp.name = "Kalavathi";
		
		mp.printStudent();
		
	}

}
