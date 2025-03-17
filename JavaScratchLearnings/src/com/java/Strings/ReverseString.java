package com.java.Strings;

public class ReverseString {

	public static void main(String[] args) {

		//Declaring original String Variable
		String str = "Nagendra";
		
		//Declaring another String variables and Initialize with an empty String
		String str2 = " ";
		
		// Iterate through each character in string "a" from the last index to the first.
		for( int i = str.length() - 1 ; i >= 0 ; i--) {
			
			//Extract the current Character at index "i" of the "str" string
			char ch = str.charAt(i);
			
			System.out.print(ch);
			 
		}
		
		
		System.out.println(str.length());
		
		
	}

}
 