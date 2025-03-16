package com.java.Arrays;

public class PassingArraystoMethods {

	public static void main(String[] args) {

		//initializing an array
		int[] arr = {3, 1, 2, 5, 4};
		
		//passing array to method sum()
		
		sum(arr);
		
		
	}

	private static void sum(int[] arr) {
		
		//getting sum of array values
		int sum = 0;
		
		for(int i = 0; i < arr.length; i++) {
			
			 sum = sum + arr[i];
		}
		
		System.out.println("Sum of Array is : " + sum);
	}

}
