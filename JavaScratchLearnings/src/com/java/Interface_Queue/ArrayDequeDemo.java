package com.java.Interface_Queue;

import java.util.ArrayDeque;
import java.util.Deque;

import com.java.Collections.ArrayDeque_Demo;

public class ArrayDequeDemo {

	public static void main(String[] args) {

		// Initializing an Deque

		Deque<Integer> deque = new ArrayDeque<Integer>(10);

		deque.add(10);
		deque.add(20);
		deque.add(30);
		deque.add(40);
		deque.add(50);

		System.out.println(deque);

		deque.clear();

		System.out.println(deque);

		// addFirst() method to insert the elements at the head
		deque.addFirst(564);
		deque.addFirst(291);

		// addLast() method to insert the elements at the tail
		deque.addLast(24);
		deque.addLast(14);

		System.out.println(deque);
		System.out.println(deque.element());
		System.out.println(deque);
		
		System.out.println(deque.pop());
		System.out.println(deque);
		
		System.out.println(deque.poll());
		System.out.println(deque);
	}

}
