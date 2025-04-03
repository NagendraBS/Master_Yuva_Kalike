package com.java.Interface_Set;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SetOperations {

	// Java Program Demonstrating Operations on the Set
	// such as Union, Intersection and Difference operations

	public static void main(String[] args) {

		// Creating an object of Set class
		// Declaring object of Integer type

		Set<Integer> a = new HashSet<Integer>();

		// Adding all elements to List
		a.addAll(Arrays.asList(new Integer[] { 1, 3, 2, 4, 8, 9, 0 }));

		// Again declaring object of Set class
		// with reference to HashSet
		Set<Integer> b = new HashSet<Integer>();

		b.addAll(Arrays.asList(new Integer[] { 1, 3, 7, 5, 4, 0, 7, 5 }));

		// To find union
		Set<Integer> union = new HashSet<Integer>();
		union.addAll(b);
		System.out.println("Union of two Sets : " + union);

		// To find intersection
		Set<Integer> intersection = new HashSet<Integer>(a);
		intersection.retainAll(b);
		System.out.println("Intersection of the two Set : " + intersection);

		// To find the symmetric difference
		Set<Integer> difference = new HashSet<Integer>(a);
		difference.removeAll(b);
		System.out.println("Difference of the two Set: " + difference);

	}

}
