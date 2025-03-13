package com.java.Variables;

public class InstanceVariables {

	
	public String name ;
	public int i ;
	public Integer I;


	public  InstanceVariables() {
		this.name = "Nagendra nag";
	}


	public static void main(String[] args) {

        // Object Creation
		 InstanceVariables iv = new InstanceVariables();
		 
		 System.out.println("Name is :" + iv.name);
		 System.out.println("Default value for int is :" + iv.i);
		 
	     // toString() called internally
		 System.out.println("Name is :" + iv.I);
		
	}

}
