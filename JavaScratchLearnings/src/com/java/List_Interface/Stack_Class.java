package com.java.List_Interface;

import java.util.Stack;

public class Stack_Class {

	public static void main(String[] args) {

        // Create a new stack
		Stack<Integer> stack  = new Stack<Integer>();
		
        // Push elements onto the stack
		stack.push(10);
		stack.push(20);
		stack.push(30);
		stack.push(40);
		
        // Pop elements from the stack
		while(! stack.isEmpty()) {
			System.out.println(stack.pop());
			
		}
		
	}

}
