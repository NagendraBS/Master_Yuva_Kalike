 package com.example.Java_Collections;

import java.util.*;
import java.util.Map.Entry;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

public class HashMapDemo {

	public static void main(String[] args) {

// By Default HashMap allows hetrogenious Data
//		HashMap m = new HashMap( );
//  Declaring the object with Specific Data Entry(Key & value).	
		HashMap <Integer, String> m = new HashMap <Integer, String>();

		
		m.put(101, "Nag");
		m.put(102, "Yuva");
		m.put(103, "Srinivas");
		m.put(104, "Kalavathi");
		m.put(105, "Jayathi");
		m.put(102, "A");
		m.put(106, "Nag");
		
		System.out.println(m);
		
		//Geting  value by passing key from map\
		System.out.println(m.get(103));
		
		//Key 106 and value has Been Removed
		System.out.println(m.remove(106));
		
		System.out.println(m);
		
		
		// To Check the Containing Key by passing Key
		System.out.println(m.containsKey(103));
		// To Check the Containing Value by passing "Value"
        System.out.println(m.containsValue("Nag"));
        
        System.out.println(m.isEmpty());
		
        
        // To Retrive Only Key's from Hashmap
        
        System.out.println(m.keySet());
        
        // To Retrive Only Values from Hashmap
        System.out.println(m.values());

        System.out.println(m.entrySet());
        
        // Returning the Key's by Using Foreach Loop
        
        for(Object k : m.keySet()) {
        	System.out.println(k);
        }
        
        // Returning the values by Using Foreach Loop
        
        for(Object v : m.values()) {
        	System.out.println(v);
        }

        // Returning the Key & values by Using Foreach Loop

        for(Object kv : m.entrySet()) {
        	System.out.println(kv);
        }
        
        for(Object kv1 : m.keySet()) {
        	
        System.out.println(kv1 + "  " + m.get(kv1) );
        }
        
        
        
        
        // Entry Interface is the Subset of Hashmap Class
        // Entry Interface Methods-----------------------------------------
        
        for( Map.Entry entry : m.entrySet()) // 101  Nag
        
        {
        	
        	System.out.println("Entry available: ");
        	System.out.println(entry.getKey() + "     "+ entry.getValue());
        	
        }
        
        
        
        // Iterator method
        
        	Set s = m.entrySet();
        	System.out.println("Iterating the Entries :  ");
        	Iterator it = s.iterator();
        	
        	while(it.hasNext()) {
        	Map.Entry	entry1 = (Entry) it.next();
        	System.out.println(entry1.getKey() + "   " + entry1.getValue());
        	
        	}
       
	}

}
