package com.java.Exceptions_Top10;

public class ExceptionInInitializer_Dewmo {

	// While Performing   -- static Variable Initialization,  -- Performing Static block Excecution
	// If any Exception Raised , then Will get   "ExceptionIninitializerError"
	
	
	static int x = 10/0 ; 
	
	static {
		String s = null;
		System.out.println(s.length());
	}
	
	public static void main(String[] args) {

		
	}

}
