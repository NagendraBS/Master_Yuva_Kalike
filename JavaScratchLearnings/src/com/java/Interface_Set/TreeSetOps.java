package com.java.Interface_Set;

import java.util.Comparator;
import java.util.NavigableSet;
import java.util.Set;
import java.util.TreeSet;

public class TreeSetOps {

	public static void main(String[] args) {

		// Creating a Set interface with
		// reference to TreeSet class
		// Declaring object of string type
		Set<String> ts = new TreeSet<String>();

		// Elements are added using add() method
		ts.add("Geek");
		ts.add("For");
		ts.add("Geeks");

		// Print all elements inside object
		System.out.println(ts);

		// Creating a NavigableSet object with
		// reference to TreeSet class

		NavigableSet<String> Ts = new TreeSet<String>(Comparator.nullsFirst(Comparator.naturalOrder()));

		// Elements are added using add() method
		Ts.add("Geek");
		Ts.add("For");
		Ts.add("Geeks");

		// Printing the elements inside the TreeSet object
		System.out.println("Tree Set is " + ts);

		String check = "Geeks";

		// Check if the above string exists in the treeset or not

		boolean checkresult = Ts.contains(check);

		System.out.println("Contains " + check + " : " + checkresult);

		// Print the first element in the TreeSet
		System.out.println("First Element in The TreeSet :  " + Ts.first());

		// Print the Last element in the TreeSet
		System.out.println("Last element of the TreeSet : " + Ts.last());

		// Find the values just greater and smaller than the above string

		String val = "Geek";

		System.out.println("Higher : " + Ts.higher(val));
		System.out.println("Lower : " + Ts.lower(val));

		Ts.add("A");
		Ts.add("J");
		Ts.add("N");
		Ts.add("Z");

		// Print and display Current elements of TreeSet
		System.out.println("Current Elements in the TreeSet : " + Ts);

		// Removing a specific existing element inserted above
		Ts.remove("N");
		System.out.println("After Removing Elements form TreeSet :  " + Ts);

		// Now removing the first element using pollFirst() method
		Ts.pollFirst();
		System.out.println("After removing First " + Ts);

		// Now removing the first element using pollFirst() method
		Ts.pollLast();
		System.out.println("After removing Last  : " + Ts);

		// Now we will be using for each loop in order to iterate through the TreeSet
		for (String str : Ts) {
			System.out.print(str + ", ");
		}

		System.out.println();

	}

}
