package com.java.MultiDimensionalArrays;

public class ThreeDArray {

	public static void main(String[] args) {

		// Array Created and Initialized
		int[][][] arrThreeD = { 
								{ { 12, 45, 20 }, 
								  { 36, 87, 50 }, 
								  { 44, 80, 27 } }, { { 63, 21, 17 }, 
									              	  { 49, 53, 47 }, 
									                  { 34, 22, 56 } } 
							   };
		// Defining the x,y,z in MultiDimensional Array

		int n = arrThreeD.length;
		System.out.println(n);

		int m = arrThreeD[0].length;
		System.out.println(m);

		int o = arrThreeD[0][0].length;
		System.out.println(o);

		System.out.println();

		// Printing the Array
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				for (int k = 0; k < o; k++) {
					System.out.print(arrThreeD[i][j][k] + " ");
				}
				System.out.println();
			}
			System.out.println();
		}
		
		System.out.println(arrThreeD[1][2][2]);
		//  arrThreeD [First dimension (Depth)] [Second dimension (Row)] [Third dimension (Column)]

	}

}
