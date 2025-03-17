package com.java.Strings;

public class MultipleConcatenations {

	public static void main(String[] args) {

		String str1 = "Electrical";
		
		String str2 = " Science";
		
		// Combining above strings by passing one string as an argument
		String str3 = str1.concat(str2);
		
        // Print and display temporary combined string
		System.out.println(str3);
		
		
		String str4 = " Portal";
		
		//COncatenation Multiple Strings
		String str5 = str3.concat(str4);
		
		System.out.println(str5);
		
		
		
	}

}
