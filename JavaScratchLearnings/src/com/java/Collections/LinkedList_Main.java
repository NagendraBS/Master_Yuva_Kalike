package com.java.Collections;

import java.util.LinkedList;

public class LinkedList_Main {

	public static void main(String[] args) {

		// Declaring the LinkedList
		LinkedList<Integer> ll = new LinkedList<Integer>();
		
		// Appending new elements at
        // the end of the list
		for(int i = 1; i <= 5; i++)
			ll.add(i);
		
		// Printing elements
        System.out.println(ll);

        // Remove element at index 2
        ll.remove(2);

        // Displaying the List
        // after deletion
        System.out.println(ll);
		
        // Printing elements one by one
        for(int i = 0; i < ll.size() ; i++)
        		System.out.print(ll.get(i) + " ");
	
	}

}
