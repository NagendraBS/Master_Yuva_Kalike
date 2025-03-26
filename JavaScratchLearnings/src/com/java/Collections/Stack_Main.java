package com.java.Collections;

import java.util.Iterator;
import java.util.Stack;

public class Stack_Main {

	public static void main(String[] args) {

		Stack<String> stack = new Stack<String>();

		stack.push("Geeks");
		stack.push("For");
		stack.push("eeks");
		stack.push("geeks");

		// Iterator for the stack
		Iterator<String> itr = stack.iterator();

		while (itr.hasNext()) {
			System.out.println(itr.next() + " ");
		}

		System.out.println();

		stack.pop();

		// Iterator for the stack
		itr = stack.iterator();

		while (itr.hasNext()) {
			System.out.println(itr.next() + " ");
		}

	}

}
