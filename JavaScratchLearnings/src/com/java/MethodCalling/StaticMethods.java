package com.java.MethodCalling;

public class StaticMethods {

	public static void StMethod() {
		System.out.println("I am a Static Method Called With out Creating an object");
	}
	
	public static void main(String[] args) {

	    // calling the method directily
		StMethod();
		
		 // calling the method  using the class name
		StaticMethods.StMethod();
	
	}

}
