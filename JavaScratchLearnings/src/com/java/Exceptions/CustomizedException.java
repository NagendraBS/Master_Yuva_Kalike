package com.java.Exceptions;

public class CustomizedException {

//	This is Normal Termination
//	This Is GraceFull Termination
	
	
	public static void main(String[] args) {
		System.out.println("Statement - 1 ");
		try {
			System.out.println(10/0);    // Risky Code
			
		} catch (ArithmeticException e) {
			System.out.println(10/2);    // Corresponding Handling Code
		}
		System.out.println("Statement - 3 ");
	}

}
