package com.java.Interface_Set;

import java.util.HashSet;
import java.util.Set;

public class SetDemo {

	public static void main(String[] args) {
		// Creating an object of Set and
		// declaring object of type String
		Set<String> hs = new HashSet<String>();

		// Adding elements to above object
		// using add() method
		hs.add("B");
		hs.add("B");
		hs.add("C");
		hs.add("A");
		hs.add("E");
		hs.add(null);
		hs.add(null);

		// Printing the elements inside the Set object
		System.out.println("Set is " + hs);

		// Declaring a string
		String check = "D";

		// Check if the above string exists in
		// the SortedSet or not
		// using contains() method
		System.out.println("Conatins " + check + " " + hs.contains(check));

		// Removing custom element
		// using remove() method
		hs.remove("B");

		System.out.println("After Removing Element : " + hs);

		// Iterating through the Set
		// via for-each loop
		System.out.println("Iterated Elements are : ");

		for (String s : hs)
			System.out.print(s + ", ");

		System.out.println();

	}
}
