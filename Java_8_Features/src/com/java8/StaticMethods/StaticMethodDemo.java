package com.java8.StaticMethods;

interface Interf{

	public static void m1() {
		System.out.println("Static Method");
	}
}


public class StaticMethodDemo {

	public static void main(String[] args) {

		Interf.m1();

	}

}
