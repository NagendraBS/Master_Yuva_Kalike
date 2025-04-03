package com.java.Interface_Set;

import java.util.Iterator;
import java.util.LinkedHashSet;

public class LinkedHashSet_Class {

	public static void main(String[] args) {

        // Creating an empty  LinkedHashSet
		LinkedHashSet<String> lhs = new LinkedHashSet<String>();
	
		// Adding elements to above Set
        // using add() method
		lhs.add("Geek");
		lhs.add("For");
		lhs.add("A");
		lhs.add("Z");
		lhs.add("B");
		lhs.add("Geeks");
		
		System.out.println("LinkedHashSet : " +lhs);
		
        // Removing the element from above Set
		lhs.remove("Z");
		
        // Again removing the element
		System.out.println("After removing Element :  " + lhs);
		
        // Returning false if the element is not present
		System.out.println(lhs.remove("D"));
		
		
		// Iterating though the LinkedHashSet
        // using iterators
		Iterator<String> itr = lhs.iterator();
		
		while(itr.hasNext()) {
			System.out.print(itr.next() + ", ");
		}
		
		System.out.println();
		
        // Using enhanced for loop for iteration
		for(String it : lhs) {
			System.out.print(it + ", ");
		}
		
			
	}

}
