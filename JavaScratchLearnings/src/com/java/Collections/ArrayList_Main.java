package com.java.Collections;

import java.util.*;


//Java program to demonstrate the
//working of ArrayList
public class ArrayList_Main {

	public static void main(String[] args) {

		// Declaring the ArrayList with
        // initial size n
        ArrayList<Integer> al = new ArrayList<Integer>();  // ArrayList Means Resizeable Array Implementation

        // Appending new elements at
        // the end of the list
        for (int i = 1; i <= 8; i++)
            al.add(i);

        // Printing elements
        System.out.println(al);

        // Remove element at index 3
        al.remove(3);

        // Displaying the ArrayList
        // after deletion
        System.out.println(al);

        // Printing elements one by one
        for (int i = 0; i < al.size(); i++)
            System.out.print(al.get(i) + " ");
	}

}
