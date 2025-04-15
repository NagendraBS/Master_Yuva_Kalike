package com.java.Exceptions;

public class DefaultExceptionHandler {

	public static void main(String[] args) {

		doStuff();
	}
	public static void doStuff() {
		domoreStuff();
		System.out.println(10/0);
	}
	public static void domoreStuff() {
//		System.out.println(10/0);
		System.out.println("Hello");
	}
	

}
