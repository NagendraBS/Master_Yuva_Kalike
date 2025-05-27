package com.java.interview;

public class StringReverse {

	public static void main(String[] args) {

		String value = "Nagendra";
		
//  Changing the First Letter of The String to Lower Case
		String FirstLowerCases = value.substring(0, 1).toLowerCase() + value.substring(1);
		
		System.out.println(FirstLowerCases);
		
// reversing the String		
		
		
		String revString = "";
		
		for(int i = 0 ; i < value.length(); i++) {
			
			char ch = value.charAt(i);
			
			revString = ch + revString ;
			
		}
		
		System.out.println(revString);
	}

	// 
	
}
