package com.java.Exceptions;

public class throwDemoCase1 {

	static ArithmeticException e  = new ArithmeticException();      // Arithmetic Exception
//	static ArithmeticException e ;       // NullPointer Exception
	
	public static void main(String[] args) {
		
		throw e;
		
	}

}
