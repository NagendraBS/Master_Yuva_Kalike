package com.java.Exceptions_Top10;

public class IllegalStateExceptions_Demo {

	public static void main(String[] args) {

		// :  Whenever We are trying to Calling a Method WRONG time, Then Will Get  "IllegalStateExceptions"
		Thread t = new Thread();
		
				t.start();  //  Starting a thread is Allowed
				
				t.start(); //  Calling a Start() Method of same thread is WRONG time Calling a Method
 	}

}
