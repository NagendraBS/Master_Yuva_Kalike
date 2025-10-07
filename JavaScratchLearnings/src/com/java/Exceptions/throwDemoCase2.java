package com.java.Exceptions;

public class throwDemoCase2 {

	public static void main(String[] args) {

		//Complier Don't know that we are going to get ArithmeticException  @ System.out.println(10/0);
		// So it Will Complile and Provide Exceptions at RUNTIME
		
		System.out.println(10/0);
		System.out.println("Hello");

		
		
		//	Complier aware that @  "throw new ArithmeticException("Division by Zero") "   Arithmetic Exception Raised,
		// So that Next line  "System.out.println("Hello");" Won't Get Chance to Execution ,
		// So it Will Provide Compliletime Error.

//		throw new ArithmeticException("Division by Zero");
//		System.out.println("Hello");
		
		
	}

}
