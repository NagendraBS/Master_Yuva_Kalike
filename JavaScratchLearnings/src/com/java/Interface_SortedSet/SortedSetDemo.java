package com.java.Interface_SortedSet;

import java.util.Iterator;
import java.util.SortedSet;
import java.util.TreeSet;

public class SortedSetDemo {

	public static void main(String[] args) {

		SortedSet<String> ts = new TreeSet<String>();

		// Adding elemen
		ts.add("India My Nation");
		ts.add("Australia");
		ts.add("South Africa");
		ts.add("FrankFrut");

		// Adding the duplicate
		// element
		ts.add("India");

		// Displaying the TreeSet
		System.out.println(ts);

		// Automatically Sorted in Acsending Order

		// Removing items from TreeSet
		// using remove()
		ts.remove("FrankFrut");
		System.out.println("Set after Removing FrankFrut : " + ts);

		// Iterating over Tree set items

		Iterator<String> itr = ts.iterator();

		while (itr.hasNext()) {
			System.out.println(" " + itr.next());

		}

		// Return a view of the portion of this set whose elements are strictlyless than
		// toElement
		System.out.println(ts.headSet("India My Nation"));

		// Returns a view of the portion of this set whose elements are greaterthan or
		// equal to fromElement
		System.out.println(ts.tailSet("India"));

	}

}
