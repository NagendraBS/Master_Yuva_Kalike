package com.java.Strings;

public class ReverseString {

	public static void main(String[] args) {

		//Declaring original String Variable
		String str1 = "Nagendra";
		
		//Declaring another String variables and Initialize with an empty String
		String str2 = " ";
		
//		System.out.println(str.length());
		
		// Iterate through each character in string "a" from the last index to the first.
		for( int i = str1.length() - 1 ; i >= 0 ; i--) {
			
			//Extract the current Character at index "i" of the "str" string
			char ch = str1.charAt(i);
			
			// Convert the character to a String object using the "Character.toString" method
			String chStr = Character.toString(ch);
						
			//concatenate the converted string to the end of  str2
			str2 = str2.concat(chStr);
				
			 
		}
	
		System.out.println( "str1 : " + str1);
		System.out.println( "Actual Output str2 : " + str2);
		
	}

}
 