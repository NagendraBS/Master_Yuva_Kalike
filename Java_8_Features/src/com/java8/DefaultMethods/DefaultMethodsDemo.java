package com.java8.DefaultMethods;

interface Interf{
	
	default void m1()
	{
		System.out.println("Default Method");
	}
}


public class DefaultMethodsDemo implements Interf {

	public void m1() {
		System.out.println("My Own Implementatin");   //  Method Overidden is Possible
		
	}
	
	public static void main(String[] args) {

		DefaultMethodsDemo d = new DefaultMethodsDemo();
		d.m1();
		
	}

}
