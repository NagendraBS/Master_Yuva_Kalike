package com.java.Arrays;

public class MultidimensionalArray_Init {

	public static void main(String[] args) {

		// Initialized Multidimentional 2D Array

		int[][] arr = { { 2, 7, 9 }, { 3, 6, 1 }, { 7, 4, 2 } };

		// Printing 2D Array

		for (int i = 0; i < 3; i++) {

			for (int j = 0; j < 3; j++) {

				System.out.print(arr[i][j] + " ");
			}
			System.out.println();

		}
		
//		System.out.print(arr[1][1] );


	}

}
