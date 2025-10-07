package com.java.Strings;

public class ImmutableString {

	public static void main(String[] args) {

		String str = "Nagendra";
		
		// concat() method appends the string at the end   Output : Nagendra
		 str.concat("Acharya");
		 
		 //Explicitly assign it to the reference Variable, Output : NagendraAcharya
//		 str = str.concat("Acharya");
		
 
		 // This will print Nagendra because strings are immutable objects
		System.out.println(str);
		
	}

}
