package com.example.Java_Collections;

import java.util.Collections;
import java.util.LinkedList;

public class LinkedListDemo2 {

	public static void main(String[] args) {
		
		
LinkedList list = new LinkedList();
		
		// Adding Elements to the Linked List 
		
		list.add("Horse");
		list.add("Cat");
		list.add("Ant");
		list.add("Dog");
		list.add("Goat");
		list.add("Eagle");
		list.add("Fox");

		
		System.out.println(list);
		
		list.addFirst("Monkey");
		
		System.out.println("Adding first Element to the List : " +list);
		
		list.addLast("Tiger");
		
		System.out.println("Adding last Element to the List : " +list);
		
		Collections.sort(list);
//		Collections.shuffle(list);
		System.out.println(list);

		System.out.println("retrivinf first element : " + list.getFirst());
		
		System.out.println("retrivinf Last element : " + list.getLast());
		
		// removing First and last element
		
		list.removeFirst();
		System.out.println(list);
		
		list.removeLast();
		System.out.println(list);

	}

}
