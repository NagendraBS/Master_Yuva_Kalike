package com.java.numbers;

import java.util.Scanner;

public class NumberOfDigits {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter a Number : ");
		long num;
		int count = 0;

//		If you're dealing with a 10-digit mobile number and you want to store it as a String (rather than using a numeric type like int or long),
//		it's usually because you want to preserve things like leading zeros, country codes,
//		or simply treat the number as an identifier (rather than performing mathematical operations on it).
		
		
		
		num = scanner.nextInt();

		if (num < 0) {
			num = num * -1;
		} else if (num == 0) {
			num = 1;
		}

		// Logic
		while (num > 0) {
			num = num / 10;
			count++;
//			System.out.println("count : " + count);
		}

		System.out.println("Number of digits in given number is :" + count);

	}

}
