package com.java.Exceptions_Top10;

public class IllegalArgumentExceptions_Demo {

	public static void main(String[] args) {

		Thread t = new Thread();
		
		t.setPriority(10);

		// Every thread valid priority Range Will be (0  -  10),  but we are trying to give illegal Argument as 100, 
		// So, will get "IllegalArgumentException"
		t.setPriority(100);
	}

}
