package com.java.ObjectOrientedProgramming;

//Example for Oops :

public class Numbers {

	// Properties
	private int a;
	private int b;

	// Methods
	public void sum() {
		System.out.println(a + b);
	}

	public void sub() {
		System.out.println(a - b);
	}

	public static void main(String[] args) {

		// Creating Instance of Class Object
		Numbers obj = new Numbers();

		// Assigning Values to the Properties
		obj.a = 2;
		obj.b = 3;

		obj.sum();
		obj.sub();

	}

}
