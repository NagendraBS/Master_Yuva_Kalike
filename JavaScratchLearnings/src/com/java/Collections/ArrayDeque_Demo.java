package com.java.Collections;

import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDeque_Demo {

	public static void main(String[] args) {

		ArrayDeque<Integer> de_que = new ArrayDeque<Integer>(10);
		de_que.add(10);
		de_que.add(20);
		de_que.add(30);
		de_que.add(40);
		de_que.add(50);
	
		System.out.println(de_que);
		
        // clear() method
		de_que.clear();
		
		System.out.println(de_que);
		
		// addFirst() method to insert the
        // elements at the head
		de_que.addFirst(101);
		de_que.addFirst(201);
		
		// addLast() method to insert the
        // elements at the tail
		de_que.addLast(24);
		de_que.addLast(12);
		
		System.out.println(de_que);
		
		
	}

}
