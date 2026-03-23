package com.java.concurrentCollections;

import java.util.ArrayList;
import java.util.Iterator;

public class ConcurrentExceptionTest {

	public static void main(String[] args) {

		ArrayList<String> al = new ArrayList<String>();
		
		al.add("Nag");
		al.add("Yuva");
		al.add("Srini");
		al.add("Kala");
		
		Iterator it = al.iterator();	
		
		while(it.hasNext()) {
			
			System.out.println(it.next());
			
			al.add("Endava");  
			// We are trying to modify the collection simultaneously where we are iterating an Element
			// will be getting the "concurrent modification Exception"
			
		}
		
		
	}

}
