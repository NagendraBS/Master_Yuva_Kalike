package com.java.Strings;

public class NullPointerExceptionHandling {

	public static void main(String[] args) {

		String str1 = "Electrical" ;
		String str2 = null;
		
		// Combining above strings by passing one string as an argument
		String str3 = str1.concat(str2);
	
        // It will raise NullPointerException
		System.out.println(str3);
		
		
	}

}
