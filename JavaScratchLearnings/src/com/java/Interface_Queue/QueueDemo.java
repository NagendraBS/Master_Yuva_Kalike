package com.java.Interface_Queue;

import java.util.LinkedList;
import java.util.Queue;

public class QueueDemo {

	public static void main(String[] args) {

		Queue<String> queue = new LinkedList<String>();

		// add elements to the queue
		queue.add("Apple");
		queue.add("Banana");
		queue.add("Cherry");

		// print the queue
		System.out.println("Queue : " + queue);

		// remove the element at the front of the queue
		String remove = queue.remove();
		System.out.println("Remove Element : " + remove);

		// poll the element at the front of the Queue
		String poll = queue.poll();
		System.out.println("Polled Element : " + poll);
//		String remove1 = queue.remove();

		// print the updated queue
		System.out.println("Queue after Removal : " + queue);

//		queue.poll();

		// add another element to the queue
		queue.add("Dates");

		System.out.println(queue);

		// peek at the element at the front of the queue
		String peeked = queue.peek();
		System.out.println("Peeked Element : " + peeked);

		// print the updated queue
		System.out.println("Queue after peek : " + queue);

	}

}
