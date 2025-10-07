package com.example.Java_Collections;

import java.util.LinkedList;

public class LinkedListQUEUE {

	public static void main(String[] args) {

// Linked List Will Allow Hetrogeneous type Data List in QUEUE
		LinkedList ll = new LinkedList();
		
		ll.add(100);
		ll.add("Nagendra");
		ll.add("Y");
		ll.add("&&");
		ll.add(100);
		
		ll.offer(15.88775);
		
		System.out.println(ll);
		
		
		// Returning Header Element from the LinkedList QUE		
		
		System.out.println(ll.element());
		
		System.out.println(ll.peek());
		
		//Returning and Removing the Element from the LinkedList QUeue
		
		
//		System.out.println(ll.remove());
//		System.out.println(ll);
		
		System.out.println(ll.poll());
		System.out.println(ll);
	}

}
