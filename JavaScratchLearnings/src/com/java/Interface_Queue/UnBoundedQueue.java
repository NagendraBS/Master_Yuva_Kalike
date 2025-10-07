package com.java.Interface_Queue;

import java.util.LinkedList;
import java.util.Queue;

public class UnBoundedQueue {

	public static void main(String[] args) {

        Queue<Integer> queue = new LinkedList<>();

        queue.add(1);
        queue.add(2);
        queue.add(3);

        System.out.println("Queue: " + queue);
        queue.add(4); // No issue, it will expand dynamically

        System.out.println("Queue after adding 4: " + queue);

	}

}
