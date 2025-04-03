package com.java.Interface_List;

import java.util.Vector;

public class VectorDemo {

	public static void main(String[] args) {

        // Size of the Vector
		int n = 5;
		
		 // Declaring the Vector with
        // initial size n
		
		Vector<Integer> v = new Vector<Integer>(n);
		
		// Appending new elements at
        // the end of the vector
		for(int i = 0; i <= n; i++ ) {
			v.addElement(i);
		}
		
        // Printing elements
		System.out.println(v);
		
        // Remove element at index 3

		v.remove(3);
		 // Displaying the vector
        // after deletion
		System.out.println(v);
		
		// iterating over vector elements
        // using for loop
		for(int i = 0; i < v.size(); i++) {
			System.out.print(" " + v.get(i));
		}
		
	}

}
