package com.java.Interface_Queue;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;

public class DequeDemo {

	public static void main(String[] args) {

		//Initializing the Deque
		
		Deque<String> dq = new ArrayDeque<String>();
		
		//Adding Elements
		
        // add() method to insert
		dq.add("For");
		dq.addLast("Geeks");
		dq.addFirst("Geek");
		
		System.out.println(dq);
		
        // Removing Elements
		
//		System.out.println(dq.pop());
		
//		System.out.println(dq.poll());
		
//		System.out.println(dq.pollFirst());
		
//		System.out.println(dq.pollLast());
		
		// Iterating through the Deque
		dq.add("is good For Learning");
		
		System.out.println("Retriveing Elements from the Iterator");
//		Iterator<String> itr  = dq.descendingIterator();
		Iterator<String> itr = dq.iterator();
		
		while(itr.hasNext()){
			System.out.print(itr.next() + ", ");
		}
		
		System.out.println();
		//Iterating Via For Loop
		for(Iterator<String> itr1 = dq.iterator(); itr1.hasNext();) {
			System.out.print(itr1.next() + ", ");
		}
		
 	}

}
