package com.java.ComandLine_Arguments;

//Java Program to Check for Command Line Arguments


public class Hello {

	public static void main(String[] args) {

		// Checking if length of args array is greater than 0
		
		if(args.length > 0) {
			 // Print statements
            System.out.println("The command line" + " arguments are: ");
            
            
            for (String str : args) {
            	System.out.println(str);
            }
            	
            	
		} else {
			
			 System.out.println("No command line "
                     + "arguments found.");
		}
		
	}

}
