package com.java.Interface_Set;

import java.util.HashSet;
import java.util.Set;

public class InterfaceSet {

	public static void main(String[] args) {

		// Demonstrating Set using HashSet
		// Declaring object of type String

		Set<String> hash_set = new HashSet<String>();

		// Adding elements to the Set
		// using add() method
		hash_set.add("Geeks");
		hash_set.add("For");
		hash_set.add("Geeks");
		hash_set.add("Eample");
		hash_set.add("Set");

		// Printing elements of HashSet object
		System.out.println(hash_set);

	}

}
