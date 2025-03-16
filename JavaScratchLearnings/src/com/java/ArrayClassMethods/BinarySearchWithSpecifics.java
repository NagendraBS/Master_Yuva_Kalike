package com.java.ArrayClassMethods;

import java.util.Arrays;

public class BinarySearchWithSpecifics {

	public static void main(String[] args) {

		int[] intArr = {14, 25, 18,32, 57, 2, 53};
		
		int intKey = 53; 
		Arrays.sort(intArr);
		
		
		System.out.println(intKey + " found at index = " + Arrays.binarySearch(intArr, 1, 6, intKey));
	}

}