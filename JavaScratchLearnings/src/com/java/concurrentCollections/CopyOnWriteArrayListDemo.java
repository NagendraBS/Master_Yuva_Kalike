package com.java.concurrentCollections;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;

public class CopyOnWriteArrayListDemo {

	public static void main(String[] args) {

		
		ArrayList<String> l = new ArrayList<String>();
		l.add("A");
		l.add("B");
		
		System.out.println(l);
		
		CopyOnWriteArrayList<String> l2 = new CopyOnWriteArrayList<String>();
		l2.addIfAbsent("A");
		l2.addIfAbsent("C");
		System.out.println(l2);
		
		l2.addAllAbsent(l);
		System.out.println(l2);
		
	ArrayList<String> l3 = new ArrayList<String>();
	
	l3.add("A");
	l3.add("E");
	
	l2.addAllAbsent(l3);
	
	System.out.println(l2);
		
		
	}

}
