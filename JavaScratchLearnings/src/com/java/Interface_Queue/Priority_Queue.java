package com.java.Interface_Queue;

import java.util.PriorityQueue;

public class Priority_Queue {

	public static void main(String[] args) {

		PriorityQueue<Integer> pq = new PriorityQueue<Integer>();

		pq.add(3);
		pq.add(4);
		pq.add(5);
		pq.add(6);

		// Priniting the Priority Queue Elements
		System.out.println("Priority Queue Elements : " + pq);

		// Printing the top element of
		// the PriorityQueue

		System.out.println("Top element of the PriorityQueue : " + pq.peek());

		// Printing the top element and removing it
		// from the PriorityQueue container
		System.out.println("Top element and removing it from the PriorityQueue : " + pq.poll());

		// Printing the top element again
		System.out.println("After polling Top Element of the Priority Queue :  " + pq.peek());

		System.out.println("Removing elements based on priority:");

		// Removing elements (always removes the smallest element first)

		while (!pq.isEmpty()) {
			System.out.println(pq.poll());
		}

	}

}
