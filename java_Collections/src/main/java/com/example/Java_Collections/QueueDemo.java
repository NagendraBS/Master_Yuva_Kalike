package com.example.Java_Collections;

import java.util.Iterator;
import java.util.PriorityQueue;

public class QueueDemo {

	public static void main(String[] args) {

		// priority Queue
//Priority Queue will not  Allow The Hetrogeneous Or Different DatatTypes Elements
		PriorityQueue que = new PriorityQueue();

		// adding elements using add() OR offer()

		que.add("A");
		que.add("P");
		que.add("L");
		que.add("D");

		que.offer("L");

		System.out.println(que); // Insertion Order is Preserved nd Duplictaes are Allowed

		// get Head element using element() OR peek() methods

//		System.out.println(que.element());  
// If Queue is Empty the element() throws "EXCEPTION"

//		System.out.println(que.peek());
//If Queue is Empty the  peek() returns "NULL"

		// Return and Removing the Head Element from the Queue

		System.out.println(que.remove());
//If Queue is Empty remove() method Returns "EXCEPTION"		
		System.out.println(que);

		System.out.println(que.poll());
//If Queue is Empty poll() method Returns "NULL"		
		System.out.println(que);

		// Iterating the elements from Queue by using Iterator method

		Iterator itr = que.iterator();

		System.out.println("Iterating QUEUE Elements ");
		while (itr.hasNext()) {
			System.out.println(itr.next());

		}
		
		// Get out the Elements from QUEUE using foreach Loop
		System.out.println("getting out the Elements from QUEUE using foreach Loop");
		for(Object ele : que) {
			System.out.println(ele);
		}
		

	}
}
