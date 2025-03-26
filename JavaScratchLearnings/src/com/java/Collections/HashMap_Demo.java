package com.java.Collections;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class HashMap_Demo {

	public static void main(String[] args) {

		Map<Integer, String> hm = new HashMap<Integer, String>();
		hm.put(1, "Geeks");
		hm.put(2, "For");
		hm.put(3, "Geeks");
		
		System.out.println("value for 1 is : " + hm.get(1));
		
		for(Entry<Integer, String> e : hm.entrySet()) {
			System.out.println(e.getKey() + " : " + e.getValue());
		}
		
		
	}

}
