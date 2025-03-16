package com.java.Arrays;

public class clone1DArray {

	public static void main(String[] args) {

		int[] array = {1,4,6,3,8};
		
		// cloning of one-dimensional arrays
		int[] cloneArray = array.clone();
		
		// will print false as shallow copy is created
		System.out.println(array == cloneArray);
		
		// will print true as shallow copy is created
        // i.e. sub-arrays are shared
		System.out.println(array[2] == cloneArray[2]);
		
		for(int i = 0 ; i < cloneArray.length; i++) {
			System.out.println("Cloned  Array are : " + cloneArray[i]);
		}
		
		}
	}


