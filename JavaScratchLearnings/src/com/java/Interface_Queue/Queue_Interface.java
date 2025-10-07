package com.java.Interface_Queue;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

public class Queue_Interface {

	public static void main(String[] args) {

		Queue<Integer> queue = new LinkedList<Integer>();

		// Adds elements {0, 1, 2, 3, 4} to the queue

		for (int i = 0; i < 5; i++) {
			queue.add(i);
		}

		System.out.println("Elements of the Queue : " + queue);

		// To remove the head of queue.
		int remove = queue.remove();
		System.out.println("Removed Element : " + remove);

		// To view the head of queue
		int peek = queue.peek();
		System.out.println("Head of the Queue : " + peek);

		// Rest all methods of collection interface like size() and contains() can be
		// used with this implementation.
		System.out.println("Queue Contains 0 : " + queue.contains(0));
		System.out.println("Queue size is  : " + queue.size());

		// Iterate Queue elements

		Iterator<Integer> itr = queue.iterator();
		System.out.println("Retriving Elements using Iterator ");

		while (itr.hasNext()) {
			System.out.print(itr.next() + ", ");
		}
		System.out.println();

		// Retriving Elements using For each Loop:

		System.out.println("Retriving Elements using for Each loop ");
		for (int retriver : queue) {
			System.out.print(retriver + " ,");
		}

	}

}
