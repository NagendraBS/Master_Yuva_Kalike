package com.java.FinalArray;

public class FinalArray {

	public static void main(String[] args) {

		final int[] arr = {10, 20, 30, 40, 50, 60};
		
		//Array object data changing
		arr[4] = 100;
		
		for(int i = 0 ; i< arr.length ; i++) {
			System.out.print(arr[i] + " ");
				
		}
	}

}
