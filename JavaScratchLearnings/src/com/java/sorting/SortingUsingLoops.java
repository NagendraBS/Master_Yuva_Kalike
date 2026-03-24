package com.java.sorting;

public class SortingUsingLoops {

	// Uses Bubble Sort Algorithm:
	
	public static void main(String[] args) {

		int arr[] = {80, 32, 45, 12, 30};
		
		bubbleSort(arr);

	}
	
	
	public static void bubbleSort(int arr[]) {
		
		// Our Code
		for(int j = 0; j < arr.length-1; j++) {
			
			for(int k = 0; k < arr.length-1; k++) {
				
				if(arr[k] > arr[k + 1]) {
					
					// write code to swap

					int temp = arr[k];    // temp = 80
					arr[k] = arr[k+1];       //
					arr[k+1] = temp;
				}
			}
		}
		
		
		// code to Print Array
		for(int i = 0; i < arr.length; i++) {
			System.out.print(arr[i] + " ");
		}
		
	}

}
