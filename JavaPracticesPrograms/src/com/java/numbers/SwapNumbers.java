package com.java.numbers;

import java.util.Scanner;

public class SwapNumbers {

	//swap two numbers without using third variable
	
	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);
		
		System.out.println("Enter the First Number  a : ");
		int a = scanner.nextInt();
		
		System.out.println("Enter the Second Number  b : ");
		int b = scanner.nextInt();
		
		System.out.println("Before Swapping   a : " + a + " , b : " + b  );
		
		a = a + b;
		b = a - b;
		a = a - b ;
		
		System.out.println("After S2wapping: a = " + a + ", b = " + b);
	}

}
