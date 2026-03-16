package com.java.patternsPractices;

public class Practices {

	public static void main(String[] args) {

		pattern(8);
	}

	static void pattern(int n) {

		for (int i = 0; i < n; i++) {
			

			for (int k = 0; k < (n - i); k++) {

				System.out.print(" ");
			}

			for (int j = 0; j < ((2*i)+1); j++) {

				System.out.print("*");
			}

			for (int k = 0; k < (n - i);k++) {

				System.out.print(" ");
			}

			System.out.println();
		}
	}

}
