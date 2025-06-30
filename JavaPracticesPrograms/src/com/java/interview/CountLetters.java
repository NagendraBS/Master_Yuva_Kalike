package com.java.interview;

import java.util.Scanner;

public class CountLetters {

	
	//input : hhhdddrr
	//output : 3h3d2r
	
	public static String getCountofLetters(String input) {
		
		if(input.isBlank() || input == null) {
			
			return " ";
		}
		
		
		StringBuilder outputResult = new StringBuilder();
		
		char currentChar = input.charAt(0);
		int count = 0;
		
		for(int i = 0 ; i < input.length(); i++) {
			
			char nextChar = input.charAt(i);
			
			if(currentChar == nextChar) {
				count ++ ;
			}
			else {
				outputResult.append(count).append(currentChar);
				currentChar = nextChar;
				count = 1;
//				System.out.println(nextChar);
			}
			
			
		}	
		outputResult.append(count).append(currentChar);
		return outputResult.toString();
	
		
	}
	
	
	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		 String input = sc.nextLine();
		 
		 String output = getCountofLetters(input);
		 
		 System.out.println("Output : " + output);

		
	}

}
