package com.java.Interface_Map;

import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMap_Demo {

	public static void main(String[] args) {

		// Create a LinkedHashMap of 
        // Strings (keys) and Integers (values)
		Map<String, Integer> llhm = new LinkedHashMap<String, Integer>();
		
        // Displaying the LinkedHashMap
		System.out.println(" " + llhm);
		
		
		//LinkedHashMap is Used Only for maintaining insertion Order of the Elements.
		llhm.put("a", 99);
		llhm.put("z", 89);
		llhm.put("r", 79);
		llhm.put("q", 29);
		llhm.put("e", 49);
		
		System.out.println(" " + llhm);
		
	}

}
	