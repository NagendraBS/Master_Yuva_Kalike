package com.java.ObjectOrientedProgramming;

//Base class Person
class Person1{
	
	// Method that displays the 
    // role of a person
	public void role() {
		System.out.println("Iam a Person");
	}
	
}


//Derived class Father that 
//overrides the role method
class Father extends Person1{
	
	
	// Overridden method to show 
    // the role of a father
	
	@Override
	public void role() {
		System.out.println("Iam a Father");
	}
}


public class PolyMorphism1 {

	public static void main(String[] args) {

		// Creating a reference of type Person 
        // but initializing it with Father class object
		
		
//		Person1 p = new Person1();

		Person1 p = new Father();
		
		// Calling the role method. It calls the 
        // overridden version in Father class
		p.role();
	}

}
