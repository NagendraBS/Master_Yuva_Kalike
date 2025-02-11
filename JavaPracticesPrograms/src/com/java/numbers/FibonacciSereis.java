package com.java.numbers;

import java.util.Scanner;

public class FibonacciSereis {

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter Number to Get Fibonachi sereis Upto : ");

		int number = scanner.nextInt();

		int first = 0;
		int second = 1;
		int next;

		System.out.println("Fibonachi Sereis is : ");

		for (int i = 0; i <= number; i++) {

			System.out.println(first);
			next = second + first;
			first = second;
			second = next;

		}

	}

}
