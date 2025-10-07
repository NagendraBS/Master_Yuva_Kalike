package com.example.Java_Collections;

import java.util.*;

public class HashSetDemo {

	public static void main(String[] args) {

		
//	HashSet  hs = new HashSet(100);  Initial Capacity is 100
//	HashSet  hs = new HashSet(100,(float)0.90); // Initial Capacity is 100 and Load factor is 90%
	
//	HashSet <Integer> hs = new HashSet<Integer>();
		
	HashSet hs = new HashSet();  // default capacity is 16 and Load Factor is 75%
		
	// Add Object Or Elements into HashSet
	
	hs.add("&&");
	hs.add("java");
	hs.add(80.67);
	hs.add('A');
	hs.add(true);
	hs.add(null);
	
	System.out.println(hs);  // Instertion order Will Not Preserved
	
	// remove the Elements From hashSet

	hs.remove('A');
	
	System.out.println(hs);
	
	// Contains 
	
	System.out.println(hs.contains("java"));
	System.out.println(hs.contains("Nag"));

	System.out.println(hs.isEmpty());
	
	
	// Read the Elements from the HashSet
	
	//for Each loop
	
	
//	for (Object e : hs) {
//		
//		System.out.println("Elements exists in HashSet : " +e);
//	}
//	
	
	
	// Read data Elements using iterator
	
	Iterator it = hs.iterator();
	
	while(it.hasNext()) {
		System.out.println("Elements in the HashSet : " + it.next() );
	}
	
	
	}

}
