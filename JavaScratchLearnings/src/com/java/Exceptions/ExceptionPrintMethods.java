package com.java.Exceptions;

public class ExceptionPrintMethods {

	public static void main(String[] args) {

		try {
			
			System.out.println(10/0);
		} catch (Exception e) {
			
		//  e.printStackTrace()  Provides Complete Details Of Exceptions Like
		//  Name of the Exception : Description of Exception
		//  Stack trace (In Which Method Exception Raised and Which All the Methods Called by the Exception Raised Method till main Method)
			e.printStackTrace();    
			
			
		//  Name of the Exception : Description of Exception
			System.out.println(e);
			System.out.println(e.toString());
			
			// Only Description of Exception
			System.out.println(e.getMessage());  
		}
		
	}

}
