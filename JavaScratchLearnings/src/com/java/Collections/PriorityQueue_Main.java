package com.java.Collections;

import java.util.PriorityQueue;

public class PriorityQueue_Main {

	public static void main(String[] args) {

		// Creating empty priority queue
		PriorityQueue<Integer> pQueue = new PriorityQueue<Integer>();

		// Adding items to the pQueue using add()
		pQueue.add(10);
		pQueue.add(20);
		pQueue.add(15);

		System.out.println(pQueue);

		// Printing the Top Element of Priority Queue
		System.out.println(pQueue.peek());

		// Printing the top element and removing it
		// from the PriorityQueue container
		System.out.println(pQueue.poll());

		System.out.println(pQueue.peek());

		System.out.println(pQueue.poll());

		System.out.println(pQueue.peek());

		System.out.println(pQueue);

	}

}
