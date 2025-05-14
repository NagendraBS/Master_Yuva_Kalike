package com.java8.MethodANDConstructorReferences;

public class MethodReference_Demo {

	public static void main(String[] args) {
		
		Runnable r = MethodReference_Demo::m1;   // Using Method Reference
		
		Thread t = new Thread(r);
		t.start();
		
		for(int i = 0; i <= 10; i++) {
			System.out.println("Main Thread");
		}
		
	}

	
	public static void m1()

	{
		for(int i = 0; i <= 10; i++) {
			System.out.println("Child Thread");
		}
	}
}
