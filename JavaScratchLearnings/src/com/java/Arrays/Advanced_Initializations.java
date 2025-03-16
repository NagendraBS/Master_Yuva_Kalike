package com.java.Arrays;

import java.util.stream.IntStream;

//Java program to demonstrate different ways of
//initializing an integer array

public class Advanced_Initializations {

	public static void main(String[] args) {

		// Initializing an array of integers using IntStream.range() method
		int[] arr1 = IntStream.range(1, 5).toArray();
		for (int i=0; i < arr1.length; i++) {
			System.out.print(arr1[i] + " ");
		}
		
		System.err.println('\n');
		
		// Initializing an array of integers using IntStream.rangeClosed() method

		int arr2[] = IntStream.rangeClosed(1, 5).toArray() ;
		for(int i = 0; i < arr2.length; i++) {
			System.out.print(arr2[i] + " ");
		}
		
		System.out.println('\n');
		
		// Initializing an array of integers using IntStream.of() method
		
		int arr3[] = IntStream.of(1,2,3).toArray();
		for (int i = 0; i < arr3.length; i++ ) {
			System.out.print(arr3[i] + " ");
		}
		
	}

}
