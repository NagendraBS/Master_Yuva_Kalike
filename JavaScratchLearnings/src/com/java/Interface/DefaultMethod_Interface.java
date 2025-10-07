package com.java.Interface;

//interface can have Methods from JDK 8 Onwards 
interface testInterf{
	
	// This is a constant (static and final by default)
	final int a = 10;
	
    // Default method with implementation
	default void display() {
		System.out.println("Hello");
	}
	
}

public class DefaultMethod_Interface implements testInterf{

	public static void main(String[] args) {

		DefaultMethod_Interface in = new DefaultMethod_Interface();
		
		in.display();
		
	}

}
