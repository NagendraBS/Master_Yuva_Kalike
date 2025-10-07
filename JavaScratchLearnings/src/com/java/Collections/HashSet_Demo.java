package com.java.Collections;

import java.util.HashSet;
import java.util.Iterator;

public class HashSet_Demo {

	public static void main(String[] args) {

		HashSet<String> hs = new HashSet<String>();

		hs.add("Geeks");
		hs.add("For");
		hs.add("Geeks");
		hs.add("Is");
		hs.add(null);
		hs.add("Very Helpful");

		// Insertion Order is Not Preserved
		// Duplicates are Not Allowed
		//Null Space is Allowed
		System.out.println(hs);

		Iterator<String> itr = hs.iterator();

		while (itr.hasNext()) {
			System.out.println(itr.next());
		}

	}

}
