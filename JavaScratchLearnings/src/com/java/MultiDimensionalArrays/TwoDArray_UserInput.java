package com.java.MultiDimensionalArrays;

import java.util.Scanner;

public class TwoDArray_UserInput {

	public static void main(String[] args) {

		System.out.println("Two Dimensional Array with User input");
		
        // Taking Number of Rows and Columns from User
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Enter the number of Rows : ");
		int row = sc.nextInt();
		
		System.out.print("Enter the number of Columns : ");
		int column = sc.nextInt();
		
		int [][] arrTwo = new int [row][column];
		
		
        // Operating on Two Dimensional Array
		for(int i = 0; i < row; i++ ) {
			for(int j = 0; j < column; j++) {
//				System.out.println(arrTwo[i][j]);
				arrTwo[i][j] = i * j;
			}
		}
		
		// Printing Elements of Arrays
		for(int i = 0; i < row; i++) {
			for(int j = 0; j < column; j++) {
				System.out.print(arrTwo[i][j] + " ");
			}
			System.out.println();
		}
		sc.close();

	}

}
