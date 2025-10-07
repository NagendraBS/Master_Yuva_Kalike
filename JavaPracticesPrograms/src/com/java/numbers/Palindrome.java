package com.java.numbers;

import java.util.Scanner;

//A palindrome number is a number that remains the same when its digits are reversed. 
//For example, 121 is a palindrome because if you reverse the digits, you still get 121.
//A palindrome number reads the same forward and backward.


public class Palindrome {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter a Number to Check Plaindrome or Not");
		int number = scanner.nextInt();

		if (isPalindrome(number)) {
			System.out.println("Number is Palaindrome");
		} else {
			System.out.println("Number is Not a Palaindrome");
		}

	}

	public static boolean isPalindrome(int num) {

		int originalNumber = num;
		int reversedNumber = 0;

		while (num != 0) {
			int digit = num % 10;
			reversedNumber = reversedNumber * 10 + digit;
			num = num / 10;
		}
		return originalNumber == reversedNumber;

	}

}
