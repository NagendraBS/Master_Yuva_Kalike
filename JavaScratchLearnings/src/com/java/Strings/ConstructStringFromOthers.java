package com.java.Strings;

import java.net.MulticastSocket;

public class ConstructStringFromOthers {

	public static void main(String[] args) {

        // Character Array
		char characters[] = { 'Y', 'u', 'v', 'a' };
		
        // Creating new String using Character Array
		String firstString = new String(characters);
		
		
        // Creating new String using another String
		String secondString = new String(firstString);
		
		System.out.println(firstString);
		System.out.println(secondString);
		
		System.out.println(firstString == secondString);
		
	}

}
