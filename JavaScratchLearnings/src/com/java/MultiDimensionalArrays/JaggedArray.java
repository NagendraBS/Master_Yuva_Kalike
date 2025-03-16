package com.java.MultiDimensionalArrays;

public class JaggedArray {

	public static void main(String[] args) {

        // Declaring 2-D array with 2 rows
		int [][] arrTwo = new int[2][];
		
        // Making the above array Jagged
		arrTwo[0] = new int[3];
		arrTwo[1] = new int[2];
		
        // Initializing array
		int count = 0;
		for(int i = 0; i < arrTwo.length; i++) {
			for(int j = 0; j < arrTwo.length; j++) {
				arrTwo[i][j] = count++ ; 	
			}
		}
		
		for(int i = 0; i < arrTwo.length; i++) {
			for(int j = 0;j < arrTwo[i].length; j++) {
				System.out.print(arrTwo[i][j]+ " ");
			}
			System.out.println();
		}
	}

}
