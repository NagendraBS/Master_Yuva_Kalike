package com.java.ArrayClassMethods;

import java.util.Arrays;

public class CopyOf {

	public static void main(String[] args) {

		int[] arr= {10, 20, 15, 22, 35};
		
		System.out.println("Integer Array : " + Arrays.toString(arr));
		
		System.out.println("New Arrays by Copy of Integer Array : " + Arrays.toString(Arrays.copyOf(arr, 4)));
		System.out.println("New Arrays by Copy of Integer Array : " + Arrays.toString(Arrays.copyOf(arr, 7)));
	}

}
