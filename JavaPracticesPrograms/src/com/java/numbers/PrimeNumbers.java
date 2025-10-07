package com.java.numbers;

import java.util.Scanner;

public class PrimeNumbers {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter a Number : ");

		int number = scanner.nextInt();

		isPrime(number);

		if (isPrime(number)) {

			System.out.println(number + " is Prime Number ");
		} else {
			System.out.println(number + "is Not a Prime Number " );
		}

	}

	
	//A prime number is a number that is greater than 1 and has no divisors other than 1 and itself. 
	//In other words, it cannot be divided evenly (without a remainder) by any number other than 1 and itself.
	
	public static boolean isPrime(int num) {

		for (int i = 2; i <= num / 2; i++) {

			if (num % i == 0) {
				return false;
			}

		}

		return true;

	}
}
