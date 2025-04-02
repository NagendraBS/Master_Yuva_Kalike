package com.java.List_Interface;

import java.util.ArrayList;

public class Array_List {

	public static void main(String[] args) {

		// Creating an Array of string type
		ArrayList<String> al = new ArrayList<String>();

//			1.Addition
		// Adding elements to ArrayList
		// at the end
		al.add("Geeks");
		al.add("Geeks");

		System.out.println("Original List : " + al);

		// Adding Elements at the specific
		// index
		al.add(1, "For");
		System.out.println("After adding Element at the Index 1 : " + al);

		// 2. Deletion of Element
		al.remove(0);
		System.out.println("Element Removed from the index 0 : " + al);

		// Removing Element using the value
		al.remove("Geeks");
		System.out.println("Element Geeks removed : " + al);

		// 3. Updating Values

		// Updating value at index 0
		al.set(0, "Developer");

		// Printing all the elements in an ArrayList
		System.out.println("List after Updation of Value : " + al);

	}

}


//FAQs of ArrayList in Java
//How is ArrayList different from an Array in Java?
//An ArrayList can resize dynamically, while a traditional array has a fixed size. ArrayList also provides many useful methods like add(), remove(), and size().
//
//
//How to Access elements in an ArrayList?
//Elements can be accessed using the get() method:
//String element = list.get(0);
//
//
//How to Remove an element from an ArrayList?
//Use the remove() method to remove elements by index:
//list.remove(0);
//
//
//Is ArrayList Synchronized?
//No, ArrayList is not synchronized. Use Collections.synchronizedList(new ArrayList<>()) for thread-safe operations.
//
//
//Can we Store null elements in an ArrayList?
//Yes, ArrayList can store null elements.
//
//
//How is data stored in ArrayList?
//ArrayList can store data till the ArrayList size is full, after that the size of ArrayList is doubled if we want to store any more elements.
