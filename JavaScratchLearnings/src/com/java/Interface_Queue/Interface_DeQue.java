package com.java.Interface_Queue;

import java.util.ArrayDeque;
import java.util.Deque;

public class Interface_DeQue {

	public static void main(String[] args) {

		Deque<String> dque = new ArrayDeque<String>();
		
		dque.addFirst("6");
		dque.add("4");
		dque.addLast("3");
		dque.add("2");
		dque.add("1");
		
		System.out.println(dque);
		
		String f = dque.removeFirst();
		String l = dque.removeLast();
		
        // Displaying the removed Deque Element
		System.out.println("First " + f + ", "+ "Last " + l);
		
		
	}

}
