package com.java.ArrayClassMethods;

import java.util.Arrays;

public class BinarySearch {

	public static void main(String[] args) {

		int[] intArr = {10, 20, 25, 30, 15, 22};
		
		int intkey = 15;
		
		//Sorting arrays to be in ascending order
		Arrays.sort(intArr);
		
		System.out.println( intkey + " Found at index : " + Arrays.binarySearch(intArr, intkey));
		
		
	}

}
 