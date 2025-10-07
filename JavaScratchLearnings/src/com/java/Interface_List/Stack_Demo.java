package com.java.Interface_List;

import java.util.Stack;

public class Stack_Demo {

    // Pushing element on the top of the stack
	static void stack_push(Stack<Integer> stack) {
		for(int i = 0 ; i < 10 ; i++) {
			stack.push(i);
		}
		
	}
	
    // Popping element from the top of the stack
	static void stack_pop(Stack<Integer> stack) {
        System.out.println("Pop Operation:");
		
		while(! stack.isEmpty()) {
			
			Integer popedStack = stack.pop();
			System.out.println(popedStack);
			 
		}
	}
	
    // Displaying element on the top of the stack
	static void stack_peek(Stack<Integer> stack) {
		Integer peekStack = stack.peek();
		System.out.println("Element on Stack top : " + peekStack);
		
	}
	
    // Searching element in the stack
	static void stack_search(Stack<Integer> stack, int element){
		Integer stackSearch = stack.search(element);
		
		if(stackSearch == -1) {
			System.out.println("Element Not Found  ! ");
		}else {
			
			System.out.println("Element found at position " + element + " is :" + stackSearch	);
		}
	} 
	
	
	public static void main(String[] args) {

		Stack<Integer> stack = new Stack<Integer>();
		
		stack_push(stack);
		System.out.println("Pushing to Stack : " + stack);
		
		stack_pop(stack);
		
		stack_push(stack);

		stack_peek(stack);
		
		stack_search(stack, 8);

		stack.remove(3);
		
		System.out.println(stack);
		
		
	}

}
 