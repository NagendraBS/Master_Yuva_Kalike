package com.java.concurrentCollections;

import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapDemo {

	public static void main(String[] args) {

		
		ConcurrentHashMap<Integer, String> hm = new ConcurrentHashMap<Integer, String>();
		
		hm.put(101, "Nag");
		hm.put(102, "Yuva");
		
		System.out.println(hm); // {101 = nag, 102 = Yuva}
		
		hm.remove(101, "Nag");
		System.out.println(hm);
		
		hm.replace(102, "Yuva", "Srini");
		System.out.println(hm);
		
		hm.putIfAbsent(103, "Kala");
		System.out.println(hm);
		
		
		hm.putIfAbsent(102, "Gx");
		System.out.println(hm);
		
	}

}
