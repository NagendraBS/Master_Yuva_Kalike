package com.java.Constructors;

// Java Program to illustrate constructor overloading
// using same task (addition operation ) for different
// types of arguments.

class Endava{
	
	//Constructor with Single Argument
	Endava(String name){
		System.out.println("Constructor with Single Argument - String : " + name);
	}
	
	Endava(String name, int id){
		System.out.println("Constructor with two Argument - String and Integer : " + name  + " and " + id);
	}
	
	// Constructor with one argument but with different
    // type than previous..
	Endava(long id){
		System.out.println("Constructor with one argument : " + "Long id : " + id);
	}
	
}


public class ConstructorOverloading {

	public static void main(String[] args) {

		// Creating the objects of the class named 'Geek'
        // by passing different arguments
		
		// Invoke the constructor with one argument of
        // type 'String'.
		Endava endava1 = new Endava("Nagendra");
		
        // Invoke the constructor with two arguments
		Endava endava2 = new Endava("Yuvaraj" , 102);
		
		// Invoke the constructor with one argument of
        // type 'Long'.
		Endava endava3 = new Endava(983648439);
		
		
		
	}

}
