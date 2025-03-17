package com.java.Strings;

public class StringMethods {

	public static void main(String[] args) {

		String s = "GeeksforGeeks";
		// OR  String s = new String("GeeksforGeeks")
		System.out.println("String is : " + s);
		System.out.println();
		
		//returns the number of Characters in the String
		System.out.println("String Length : " + s.length());
		System.out.println();

		
        // Returns the character at ith index.
		System.out.println("Character at the 5th index of String : " + s.charAt(5));
		System.out.println();

		
		// Return the substring from the ith  index character to end of string
		System.out.println("SubString : " + s.substring(5));
		System.out.println();

		
        // Returns the substring from i to j-1 index.
		System.out.println("SubString : " + s.substring(5, 12));
		System.out.println();

		
        // Concatenates string2 to the end of string1.
		String s1 = "Nagendra";
		String s2 = " Developer";
		System.out.println("Concatenated String : " + s1.concat(s2));
		System.out.println();

		
		// Returns the index within the string of the first occurrence of the specified string.
		String s3 = "Knowledge Rule the World";
		System.out.println("Index of Characters : " + s3.indexOf("W"));
		System.out.println();

		
		// Returns the index within the string of the first occurrence of the specified string, starting at the specified index.
		System.out.println("Index of 'l' : " + s3.indexOf('l', 6));    
		//indexOf('a' , int fromIndex)
		System.out.println();

		
        // Checking equality of Strings

		Boolean out = "Geeks".equals("geeks");
		System.out.println("Checking Equality : " + out);
		out = "Geeks".equals("Geeks");
        System.out.println("Checking Equality : " + out);
		
        out = "Geeks".equalsIgnoreCase("gEeks ");
        System.out.println("Checking Equality : " + out);
        
        //If ASCII difference is zero then the two strings are similar
        int out1 = s1.compareTo(s2);
        System.out.println("the difference between ASCII value is = "+out1);
		System.out.println();

        
        //Converting Cases
        String s4 = "NAgENdRA";
        System.out.println("Changing to lower Case : " + s4.toLowerCase());
        
        String s5 = "yuVaraJ";
        System.out.println("Changing to Uppper Case : " + s5.toUpperCase());
		System.out.println();

        
        //Trimming the World
        String s6 = "  Knowledge Rule the World   ";
        System.out.println("Brefore Trim the Statment : " + s6);
        System.out.println("After Trim the Statment : " + s6.trim());
		System.out.println();

		
        // Replacing characters
        String str1 = "feeksforfeeks";
        System.out.println("Original String : " + str1);
        
        String str2 = str1.replace('f', 'g');
        System.out.println("Replaced String f with g -> " + str2);

		
	}

}
