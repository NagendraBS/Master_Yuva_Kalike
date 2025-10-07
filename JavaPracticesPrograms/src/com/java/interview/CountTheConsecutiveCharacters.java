package com.java.interview;

import java.util.Scanner;

public class CountTheConsecutiveCharacters {

	
	public static String getRepeatedAlphabets(String input) {
		
		if(input == null || input.isEmpty())
			return " ";
		
		
		StringBuilder result = new StringBuilder();
		int count = 1;
		char current = input.charAt(0);
		
		
		for(int i = 1; i < input.length(); i++) {
			
			char next = input.charAt(i);
			
			if(next == current) {
				
				count ++;	
			}
			else {
				result.append(count).append(current);
				current = next;
				count = 1;
			}
			
		}
		
		 // Append the last character count
        result.append(count).append(current);
		
		return result.toString()  ;
		
	}
	
	public static void main(String[] args) {

//		String input = "rrrnnnndddddttaaassss";
//		 String output = getRepeatedAlphabets(input);

		
		Scanner sc = new Scanner(System.in);
		String inputString = sc.nextLine();
		
		String outputString = getRepeatedAlphabets(inputString);
		
		System.out.println("Output : " + outputString);
	}

}
