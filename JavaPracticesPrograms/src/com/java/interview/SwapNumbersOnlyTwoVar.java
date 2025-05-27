package com.java.interview;

public class SwapNumbersOnlyTwoVar {

	public static void main(String[] args) {

		int a = 5, b = 10 ;
		
		System.out.println("Before Swapping a = " + a + " b = " + b);
		
		a = a + b;  // a = 15;
		
		b = a - b;  // b = 5
		
		a =  a - b;
		
		System.out.println("After Swapping a = " + a + " b = " + b);

	}

}
