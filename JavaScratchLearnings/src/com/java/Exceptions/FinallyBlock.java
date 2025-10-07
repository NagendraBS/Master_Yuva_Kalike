package com.java.Exceptions;

import com.java.Operator.ArithmenticOperator;

public class FinallyBlock {

	
//	Finally Block is used for Excecute Always 
//	Irrespective of Weather  Exception Raised, Exception Not Raised, Exception handled or Not .
//	Even in the ABNORMAL TERMINATION also the Finally block    CLEAN UP 	Code Will   Excecute.
	
	public static void main(String[] args) {

//		CASE - 1 : If there is No Exception
		
//		try {
//			System.out.println("Try");
//		}
//		catch(Exception e) {
//			System.out.println("Catch");
//		}
//		finally {
//			System.out.println("Finally");
//		}
//		
//		
//		CASE - 2 : If an Exception Raised and Handled
		
//		try {
//			System.out.println("try");
//			System.out.println(10/0);
//		}
//		catch(ArithmeticException e) {
//			System.out.println("Catch");
//		}
//		finally {
//			System.out.println("Finally");
//		}
		
//		CASE - 3 : If an Exception Raised and Not Handled
		
		try {
			System.out.println("try");
			System.out.println(10/0);   // arithmentic Exception Raised
			
		}
		catch(NullPointerException e) {
			System.out.println("Catch");   // But Trying to handle NullPointer Exception Not an Arithementc Exception Handling
		}
		// Compulsory Finally Block Code Execution
		// Jvm Handover to the Default Exception Handler  
		// Abnormal termination of program
		finally {
			System.out.println("Finally");
		}
		
		
	}

}
