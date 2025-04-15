package com.java.Exceptions;

public class Nested_Try_Catch_Finally {

	public static void main(String[] args) {

		try {
			
			System.out.println("Outer try block");
			
			
			//Nested try-catch block
			try {
				System.out.println("Inner try Block");
				System.out.println(10/0);
			}
			// What if Catch Was not handled With ArithmeticException
			catch (ArithmeticException e) {
//			catch (NullPointerException e) {
				System.out.println("Inner Catch Block");
				
				}
			
			// if the Inner Catch block not Matched for the Exception handling this below line will not be executed.
			System.out.println("Outside of inner try Block");
			
		}
		catch(Exception e) {
			System.out.println("Outer Catch block");
		}
		finally {
			System.out.println("Outer Finally Block");
		}
		
		
	}

}
