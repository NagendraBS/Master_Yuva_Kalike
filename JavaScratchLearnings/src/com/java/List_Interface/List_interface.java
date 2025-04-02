package com.java.List_Interface;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class List_interface {

	public static void main(String[] args) {

        // Creating an object of List interface
		List<String> al =  new ArrayList<String>(); 
		
        // Adding elements to object of List class
		al.add("Geeks");
		al.add("Geeks");
		al.add(1, "Geeks");
		
	
        // Display theinitial elements in List
		System.out.println("Initial Elemets of the Array List : " + al);
		
		
		
		// Setting (updating) element at 1st index
        // using set() method
		al.set(1, "For");
		
        // Print and display the updated List
		System.out.println("Updated List is : " + al);

		
		System.out.println("For is At Index : "+ al.indexOf("For"));
		
		System.out.println();
		
		//Searching Elements 
		 
        // create a list of integers
		List<Integer> al2 = new ArrayList<Integer>();
		
        // add some integers to the list
		al2.add(2);
		al2.add(3);
		al2.add(4);
		al2.add(2);
		al2.add(1);
		
		// use indexOf() to find the first occurrence of an
        // element in the list
		int i = al2.indexOf(2);
		System.out.println("First Occurenece of 2 is at index : " + i);
		
		int j = al2.lastIndexOf(2);
		System.out.println("Last Occurenece of 2 is at index : " + j);
		
		System.out.println();
		
		//Removing Elements
		
        // Creating List class object
		List<String> al3 = new ArrayList<String>();
		
		// Adding elements to the object
        // Custom inputs
		al3.add("Geeks");
		al3.add("Geeks");
		
		 // Adding For at 1st indexes
		al3.add(1, "For");
		
        // Print the initialArrayList
		System.out.println("Initial ArrayList : " + al3);
		
		 // Now remove element from the above list
        // present at 1st index
		al3.remove(1);
		
        // Print the List after removal of element
		System.out.println("After Index Removal : " + al3);
		
		// Now remove the current object from the updated
        // List
		al3.remove("Geeks");
		
        // Finally print the updated List now
		System.out.println("after the Object Removal : " + al3);

		System.out.println();
		
//		Accessing Elements
		
		 // Creating an object of List interface,
        // implemented by ArrayList class
		
		List<String> al4 = new ArrayList<String>();
		
        // Adding elements to object of List interface
		al4.add("Geeks");
		al4.add("For");
		al4.add("Geeks");
		
        // Accessing elements using get() method
		String first = al4.get(0);
		String second = al4.get(1);
		String third = al4.get(2);
		
		
		//Iterating the Elements Using For Loop
//		for(int p = 0 ; p < al4.size(); p++) {
//			System.out.println("Elements in the List are " + al4.get(i));
//		}
		
		//Iterating the Elements Using while Loop
//		Iterator<String> it = al4.iterator();
//		ListIterator<String> it = al4.listIterator();
//		
//		while(it.hasNext()) {
//			System.out.println("Elements in the List by While Loop iterator are : " + it.next());
//		}
			
		
		// Printing all the elements inside the
        // List interface object
		System.out.println(first);
		System.out.println(second);
		System.out.println(third);
		System.out.println(al4);
		
		System.out.println();
		
//		Checking if an element is present or not
		
		  // Checking if element is present using contains()
        // method
		
		boolean isPresent = al4.contains("For");
		boolean isEmpty = al4.isEmpty();
		
		// Printing the result
        System.out.println("Is  FOR present in the list ? : "+ isPresent);
		
        System.out.println("isEmpty : " + isEmpty);
		
	}

}
 