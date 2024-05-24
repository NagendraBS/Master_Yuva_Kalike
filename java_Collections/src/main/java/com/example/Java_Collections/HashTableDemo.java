package com.example.Java_Collections;

import java.util.*;
import java.util.Map.Entry;

public class HashTableDemo {

	public static void main(String[] args) {

		// Allows hetrogeneous data
//		Hashtable t =new Hashtable ();  // Default Initial Capacity is 11, Load Factor is 0.75
		
//		Hashtable t = new Hashtable(initial Capacity, Load Factor);
		
		Hashtable<Integer,String> t = new Hashtable<Integer,String>();
		
		t.put(101, "Anish");
		t.put(102, "Bhavan");
		t.put(103, "Charu");
		t.put(104, "John");
		t.put(105, "Anish");
		t.put(106, "Anil");
		// Hashtable doesnot allowed NULL in Both KEY and VALUE
//		t.put(null, "X");   // gives null Pointer Exception
		
		System.out.println(t);
		
		System.out.println(t.get(104));  //John
		
		System.out.println(t.remove(106));
		System.out.println(t);
		
		System.out.println(t.containsKey(108));
		System.out.println(t.containsKey(103));
		
		System.out.println(t.containsValue("John"));
		System.out.println(t.containsValue("Y"));
		
		System.out.println(t.isEmpty());
		
		System.out.println(t.keySet());  // eturn all the KeySet from the hashtable
		System.out.println(t.values());  // Return All the values from the hashtable
		
		
		
		System.out.println("-----------------------------------");

		// Retrive the each Entry from HashTable
		
		System.out.println("Retriving the each Entry from HashTable");
		for(int k : t.keySet()) {
			   
			System.out.println(k + "  -  " + t.get(k));
		}
		
		System.out.println("-------Entry Specific Methods Hashtable/Hashmap  using For Each----------------");
		
		for(  Map.Entry entry : t.entrySet())
		{
			
//			System.out.println(entry);
						
			System.out.println(entry.getKey()+"     "+entry.getValue());
			
		}
		
		// Iterator 
		
		System.out.println("-------------- Iterating the Entries from the Hashtable--------------");
		
		Set s = t.entrySet();
		
		 System.out.println(s);
		 
		 Iterator it = s.iterator();
		 
		 while(it.hasNext()) {
//			 System.out.println(it.next());
			   Map.Entry entry1 = (Entry) it.next();
			 System.out.println(entry1.getKey() + "   " + entry1.getValue());
		 }
		 
		 
		
		
		
		
		
	}

}
