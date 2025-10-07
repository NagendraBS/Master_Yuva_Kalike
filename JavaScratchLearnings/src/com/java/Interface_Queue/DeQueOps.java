package com.java.Interface_Queue;

import java.util.ArrayDeque;
import java.util.Deque;

public class DeQueOps {

	public static void main(String[] args) {

		Deque<String> deque = new ArrayDeque<String>();
		
		// We can add elements to the queue in various ways
		
        // Add at the last
		deque.add("Element 1 (Tail)");
		
        // Add at the first
		deque.addFirst("Element 2 (Head)");
		
        // Add at the last
		deque.addLast("Element 3 (Tail)");
		
        // Add at the first
		deque.push("Elements 4 (Head)");
		
        // Add at the last
		deque.offer("Element 5 (Tail)");
		
        // Add at the first
		deque.offerFirst("Element 6 (Head)");
		
		
		System.out.println(deque);
		
		// We can remove the first element or the last element.
		deque.removeFirst();
		deque.removeLast();
		
		System.out.println("After Removing First and last Element");
		System.out.println(deque);
		
		
	}

}
