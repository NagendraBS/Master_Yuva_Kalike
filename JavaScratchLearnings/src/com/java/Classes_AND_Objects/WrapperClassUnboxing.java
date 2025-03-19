package com.java.Classes_AND_Objects;

//Java program to demonstrate Unboxing
public class WrapperClassUnboxing {

	public static void main(String[] args) {

		 Character ch = 'N';
		 
		 // unboxing - Character object to primitive conversion
		 
//		 char c = ch;             // not preffered Method
//		 System.out.println(c);
		 
		 char c1 = ch.charValue(); // Recommended Method  "  <datatype>Value()  "
		 System.out.println(c1);
		 
	}

}
