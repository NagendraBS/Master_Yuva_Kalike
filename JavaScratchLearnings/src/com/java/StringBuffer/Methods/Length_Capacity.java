package com.java.StringBuffer.Methods;

public class Length_Capacity {

	public static void main(String[] args) {

		// Creating and storing string by creating object of StringBuffer
		StringBuffer sb = new StringBuffer("GeeksforGeeks");
		
		//Getting the Length of the String
		int l = sb.length();
		
		//Getting the Capacity of the String
		int c = sb.capacity();
		
		//Printing the Length and Capacity Value: 
		System.out.println("Length of the String : " + l);
		System.out.println("Capacity of the String : " + c);
		
		
	}

}
