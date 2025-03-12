package com.java.MemoryAreas;

public class StackOverFlowExample {

	
	
//	public static void recursiveMethod() {
//		recursiveMethod();
//	}
	
	//To avoid the StackOverflowError, you need to ensure that recursive methods have a base case—a condition to stop recursion 
	//once a certain condition is met.
	
	
//Solution Code	
	public static  void recursiveMethod(int count) {
		 
		if(count <= 0) {
			return ;
		}
		System.out.println("Recursion Depth :" + count);
		recursiveMethod( count - 1);
		 
		
	}

	
	
	public static void main(String[] args) {

		recursiveMethod(5); // calling the recursiveMethod
		
	}


}





