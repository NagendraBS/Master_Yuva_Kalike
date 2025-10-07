package com.java.numbers;

import java.util.Scanner;

public class Sumofdigits {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter numbers to be added :");
		int number = scanner.nextInt();

		int sumofdigits = calculatedSumofdigits(number);

		System.out.println("Sum of digits of " + number + " is: " + sumofdigits);

	}

	public static int calculatedSumofdigits(int num) {
		int sum = 0;

		while (num > 0) {
			int digit = num % 10;
			sum = sum + digit;
			num = num / 10;

		}

		return sum;

	}

}
