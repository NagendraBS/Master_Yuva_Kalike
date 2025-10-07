package com.java.Interface_Map;

import java.util.HashMap;
import java.util.Map;

public class Map_Interface {

	public static void main(String[] args) {

		// creating an Empty hash map
		Map<String, Integer> map = new HashMap<String, Integer>();

		// Inserting pairs in above Map using put() method
		map.put("a", 100);
		map.put("b", 200);
		map.put("c", 300);
		map.put("d", 400);
		map.put("e", 500);

		// map.put("a", new Integer(100));
		// new Integer(100): This explicitly creates an Integer object.

		// Autoboxing (Java 5 and later): In modern Java (Java 5+), you don't need to
		// use new Integer(100)
		// because Java automatically converts (or "boxes") the primitive int to an
		// Integer object.
		// So map.put("a", 100) would work the same way.

		System.out.println("Entries in Map are :");

		// Traversing through Map using for-each loop=
		for (Map.Entry<String, Integer> em : map.entrySet()) {

			// Printing keys
			System.out.println(em.getKey() + " : " + em.getValue());
		}

	}

}
