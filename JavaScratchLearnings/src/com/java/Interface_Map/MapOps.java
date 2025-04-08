package com.java.Interface_Map;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MapOps {

	public static void main(String[] args) {

		// Default Initialization of a
		// Map
		Map<Integer, String> hm1 = new HashMap<Integer, String>();

		// Initialization of a Map
		// using Generics
		Map<Integer, String> hm2 = new HashMap<Integer, String>();

		// Inserting the Elements

		hm1.put(1, "Geeks");
		hm1.put(2, "For");
		hm1.put(3, "Geeks");

		hm2.put(new Integer(1), "Geeks");
		hm2.put(new Integer(2), "For");
		hm2.put(new Integer(3), "Geeks");

		System.out.println(hm1);
		System.out.println(hm2);

		// Changing Elements

		System.out.println("Initial Map : " + hm1);

		hm1.put(2, "Is ");

		System.out.println("Changed Map : " + hm1);

		// Removing Elements

		System.out.println("Current Map  : " + hm1);

		hm1.remove(2);

		System.out.println(hm1);

		hm1.remove(3, "Geeks");
		System.out.println(hm1);

		// Iteration of Map

		hm1.put(2, "For");
		hm1.put(1, "Learning");
		hm1.put(4, "Geeks");
		hm1.put(3, "Geek");

		System.out.println(hm1);

		System.out.println("Iterated the elements: ");
		for (Map.Entry<Integer, String> mapElement : hm1.entrySet()) {
			System.out.println(mapElement);

		}

		// Count the Occurrence of numbers using Hashmap

		System.out.println("Count the Occurrence of numbers");
		int a[] = { 1, 13, 4, 1, 41, 31, 31, 4, 13, 2 };
		
		// put all elements in arraylist

		ArrayList<Integer> arrl = new ArrayList<Integer>();

		for (int i = 0; i < a.length; i++) {
			arrl.add(a[i]);
		}

		System.out.println(arrl);

		Map<Integer, Integer> h = new HashMap<Integer, Integer>();

		// counting occurence of numbers
		for (int i = 0; i < arrl.size(); i++) {

			h.putIfAbsent(arrl.get(i), Collections.frequency(arrl, arrl.get(i)));

		}

		System.out.println(h);

	}

}
