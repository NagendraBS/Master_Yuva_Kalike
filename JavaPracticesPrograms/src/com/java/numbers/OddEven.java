package com.java.numbers;

import java.util.Scanner;

public class OddEven {

	public static void main(String[] args) {

		Scanner scanner = new Scanner (System.in);
		System.out.println("Enter a Number : ");
		
		int number = scanner.nextInt();
		
		if(number % 2 == 0) {
			System.out.println( number + " is Even number ");
		}
		else {
			System.out.println( number + " is Odd number ");
		}
		
	}

}



//nextInt(): Reads an integer.
//nextLine(): Reads a line of text (string).
//nextDouble(): Reads a double value.
//next(): Reads the next token (word) from the input.
