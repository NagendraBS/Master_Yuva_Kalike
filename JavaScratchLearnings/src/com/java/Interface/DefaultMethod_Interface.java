package com.java.Interface;

<<<<<<< HEAD

//interface can have Methods from JDK 8 Onwards 
interface TestInterface{
=======
//interface can have Methods from JDK 8 Onwards 
interface testInterf{
>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3
	
	// This is a constant (static and final by default)
	final int a = 10;
	
    // Default method with implementation
	default void display() {
		System.out.println("Hello");
	}
	
}

<<<<<<< HEAD
public class DefaultMethod_Interface implements TestInterface{
=======
public class DefaultMethod_Interface implements testInterf{
>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3

	public static void main(String[] args) {

		DefaultMethod_Interface in = new DefaultMethod_Interface();
		
		in.display();
		
	}

}
