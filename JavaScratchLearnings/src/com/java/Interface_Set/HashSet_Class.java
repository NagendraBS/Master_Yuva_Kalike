package com.java.Interface_Set;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class HashSet_Class {

	public static void main(String[] args) {

        // Creating an empty HashSet of string entities

		Set <String> hs = new HashSet<String>();
		
        // Adding elements using add() method
		hs.add("Geek");
		hs.add("For");
		hs.add("Geeks");
		hs.add("A");
        hs.add("B");
        hs.add("Z");
		
		//Printing the Elements in the List
		System.out.println("HashSet : " + hs);
		hs.remove("Z");
		
        // Printing the updated HashSet elements
		System.out.println("HashSet after Removing : "+ hs);
		
        // Returns false if the element is not present
		System.out.println("B Exists : " + hs.contains("B"));
		System.out.println("Z Exists : " + hs.contains("Z"));
		
		
		// Using iterator() method to iterate
      	// Over the HashSet
		System.out.print("Using iterator : ");
		Iterator<String> it = hs.iterator();
		while(it.hasNext()) {
			System.out.print(" " + it.next());
		}
		
		System.out.println();
		 // Using enhanced for loop to iterate
      	// Over the HashSet
		System.out.print("Using Enhanced for Loop : ");
		for(String itr : hs) {
			System.out.print(" " + itr);
		}
		
	}

}
 