package com.java.Exceptions;

public class throwKeyWord {

	public static void main(String[] args) {

//		System.out.println(10/0);
		
		
		 throw new ArithmeticException("Division by Zero");
		 
		 //  throw = HandOver our Created Exception to JVM manually
		 //  new ArithmeticException("Division by Zero")  =  Creating of Exception object Explicitly.
		 
	}

}
