package com.java.Exceptions_Top10;

public class NumberFormatExceptions_Demo {

	//Whenever we are Trying to Conver the String to number, But String not Representing a Number, Its not properly Formatted
	
	//Then it will get  "NumberFormatException"
	
	public static void main(String[] args) {

		int i = Integer.parseInt("10");   //  Acceptable  Since String in Number Itself
		
		int k = Integer.parseInt("Ten");   // Not Acceptable , Since String is not a Number
		
		
	}

}
