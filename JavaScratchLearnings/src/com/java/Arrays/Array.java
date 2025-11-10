package com.java.Arrays;

<<<<<<< HEAD
=======
import java.util.Arrays;

>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3
public class Array {

	public static void main(String[] args) {

		//Method 1
		
<<<<<<< HEAD
//		int[] arr = {9, 3 , 7 , 1, 4};
=======
>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3
		int arr[] = {9, 3 , 7 , 1, 4};

		
		
		//Method 2
		
		// declares an Array of integers.
        int[] arr1;

        // allocating memory for 5 integers.
        arr1 = new int[5];

        // initialize the elements of the array
        // first to last(fifth) element
        arr1[0] = 10;
        arr1[1] = 20;
        arr1[2] = 30;
        arr1[3] = 40;
        arr1[4] = 50;

		
		int arraySize = arr1.length;
		
		for(int i = 0; i < arraySize; i++) {
			System.out.println("Elements in array are " + i + ": " + arr1[i]);
		}
<<<<<<< HEAD
				
=======
			
		int arr4[] = {9, 3 , 7 , 1, 4};
		int arr5[] = {9, 3 , 7 , 1, 4};

		
		if(Arrays.equals(arr5, arr4))
			System.out.println("Same");
		else
			System.out.println("Not Same");
		
		
>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3
	}

}
