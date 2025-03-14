package com.java.Loops;

public class Off_by_One_Errors {

	public static void main(String[] args) {
		int[] arr = { 1, 2, 3, 4 };

		// Off-by-one error: Loop runs one time too many and causes an ArrayIndexOutOfBoundsException
		
		for (int i = 0; i <= arr.length; i++) { // Wrong condition: should be i < arr.length
			
			System.out.println(arr[i]);
			
		}

	}
}
