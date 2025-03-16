package com.java.FinalArray;

public class FinalArr_manipulation {

	public static void main(String[] args) {

		final int[] arr = {1, 2, 3, 4, 5, 6};
		
		//Array object Data manipulating and printing
		for(int i = 0 ; i < arr.length; i++) {
			arr[i] = arr[i] * 10;
			System.out.print(arr[i] + " ");
		}
		
	}

}
