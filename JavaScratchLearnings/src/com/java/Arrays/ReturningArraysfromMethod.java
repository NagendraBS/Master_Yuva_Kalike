package com.java.Arrays;

public class ReturningArraysfromMethod {

	public static void main(String[] args) {

		//Calling Method which returns Array here
		int arr[] = m1();
		
		//Printing the Returned array from Method
		for(int i = 0; i < arr.length; i++) {
			int arrRet =  arr[i];
			System.out.print(arrRet + " ");
			}
		
	}
	
	private static int[] m1() {
		
		//returning an array
		return  new int[] {1,4,8,2,3};
		
	}

}
