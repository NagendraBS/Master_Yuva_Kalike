package com.java.MultiDimensionalArrays;

public class TwoDArray {

	public static void main(String[] args) {

		//Initialized and assigned Arrays
		int[][] arrTwo = {{1, 4, 5}, {4, 9, 6}};
		
		//Printing Arrays
		for(int i = 0; i < 2; i++) {
			for(int j = 0; j < 3; j++) {
				System.out.print(arrTwo[i][j] + " ");
			}
			System.out.println();
		}
		
	}

}
