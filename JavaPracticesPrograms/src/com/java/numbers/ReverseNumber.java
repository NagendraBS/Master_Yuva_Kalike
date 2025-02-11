package com.java.numbers;

import java.nio.file.spi.FileSystemProvider;
import java.util.Scanner;

public class ReverseNumber {

	public static void main(String[] args) {

		// Create a Scanner object to take input
		Scanner scanner = new Scanner(System.in);
		
		// Ask user for the number to reverse
		System.out.println("Enter a Number : ");
		int number = scanner.nextInt();
		
		// Variable to hold the reversed number
		int reversed = 0;
		
		while(number > 0) {
			
			// Get the last digit of the number
			int digit = number % 10 ;
			
			//Append the digit to the reverse number
			reversed = (reversed * 10) + digit ;
			
			// Remove the last digit from the number
			number = number / 10 ;
			
		}
		
		System.out.println("Reversed Number is  : " + reversed);
		
		
	}

}
