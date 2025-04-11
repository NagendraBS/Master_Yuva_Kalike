package com.java.Exceptions;

public class ExceptionDemo {

	public static void main(String[] args) {

		int n = 0;
		int m = 10;

		try {
			// Code that may throw an exception

			int ans = m / n;
			System.out.println("Answer : " + ans);

		} catch (ArithmeticException e) {
			// Handling the exception
			System.out.println("Division By Zero is Not Allowed !");
		} 
		
		finally {
			System.out.println("Program continues after handling the exception.");
		}

	}

}
