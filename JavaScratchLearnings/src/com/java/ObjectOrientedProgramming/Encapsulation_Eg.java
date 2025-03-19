package com.java.ObjectOrientedProgramming;

public class Encapsulation_Eg {

	//Declaring the variables as private to bind these into single unit
	private int id;
	private String name;
	
    
	//Setters Methods
	public void setId(int id) {
		this.id = id;
	}
	
	
	public void setName(String name) {
		this.name = name;
	}


	//Getters Methods
	public String getName() {
		return name;
	}

	public int getId() {
		return id;
	}



	public static void main(String[] args) {

		Encapsulation_Eg encap = new Encapsulation_Eg();
		
		encap.setId(201);
		encap.setName("SrinivasMurthy");
		
		System.out.println("Employee Id : " + encap.getId());
		System.out.println("Employee Name : " + encap.getName());
		
		
	}

}
