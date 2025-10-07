package com.example.Java_Collections;

import java.util.*;

public class LinkedListDemo {

	public static void main(String[] args) {

		// Declare The LinkedList
		
		
//		LinkedList <Integer> ll = new LinkedList<Integer>();
//		LinkedList <String> ls = new LinkedList<String>();

		LinkedList list = new LinkedList();
		
		// Adding Elements to the Linked List 
		
		list.add(100);
		list.add("Yuvaraj");
		list.add("@@");
		list.add(15.25);
		list.add('N');
		list.add(true);
		list.add(null);
		
		
		System.out.println("Elements of Linked List : " + list);
		
		
		System.out.println("No of Elements in Linked List : " +  list.size());
		
		// remove the Element
		
//		System.out.println("Removing the Element : " + list.remove(2));
		
//		System.out.println("Removing the Element : " + list.remove(5));

		
//		System.out.println("Updated List after removing Element :" +list);
	

		
		// Inserting the Elements in The LinkedList
		
		list.add(5,"$$");
		 System.out.println("After Insertion : " +list);
		
		//retriving the object from LinkedList
		 
		 System.out.println("Retriving Elements : " + list.get(1));
		
		 // Replacing the value
		 list.set(7, "S");
		 System.out.println("Updating the linkedlist : " + list );
		 
		 // Checking for the  elements in LinkedList
		 
		 System.out.println("linkedlist Contains $$ ? : " + list.contains("$$"));
		 
		 System.out.println("linkedlist Contains 50 ? : " + list.contains("50"));

		 System.out.println(list.isEmpty());
		 
		 
		 // Reading Elements from linkedList
		 
		 // using Forloop
		 
		 for (int i=0; i<list.size(); i++) {
			 
			 System.out.println("Elements in LinkedList are: " + list.get(i));
		 }
		 
		 
		 // Using ForEach Loop
		 for(Object ll : list) {
			 
			 System.out.println("Elements in LinkedList are: " + ll);
		 }
		 
		 
	}

}
