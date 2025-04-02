package com.java.ExamplesOfCollection_Interface;

import java.util.AbstractCollection;
import java.util.Iterator;
import java.util.TreeSet;

//Java code to illustrate
//methods of AbstractCollection

public class AbstractCollectionDemo {

	public static void main(String[] args) {

		//Creating an Empty Collection
		AbstractCollection<String> abs1 = new TreeSet<String>();
		
		// Use add() method to add
        // elements into the Collection
		abs1.add("Welcome");
		abs1.add("To");
		abs1.add("Geeks");
		abs1.add("4");
		abs1.add("Geeks");
		abs1.add("TreeSet");
		
        // Displaying the Collection
		System.out.println("AbstractCollection 1 : " + abs1);
		
		AbstractCollection<String> abs2 = new TreeSet<String>();
		
		 System.out.println("AbstractCollection 2: " + abs2);
		 
        // Using addAll() method to Append
		abs2.addAll(abs1);
		
		System.out.println("AbstractCollection 2 : " + abs2);
		
		abs1.clear();
		
		System.out.println("AbstractCollection 2 contains Welcome : " + abs2.contains("Welcome")	);
		
		
		System.out.println("Iteration of AbstractCollection 2 ");
		
		Iterator<String> value = abs2.iterator();
		
		while(value.hasNext()) {
			System.out.println("lemets in AbstractCollection 2 are : " + value.next());
		}
		
		
		System.out.println("AbstractCollection 1 is Empty ? : " + abs1.isEmpty());
		

		
	}

}
