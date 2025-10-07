package com.java.Interface;

//One interface can inherit another by the use of keyword extends. 
//When a class implements an interface that inherits another interface, 
//it must provide an implementation for all methods required by the interface inheritance chain.


interface A{
	
	void method1();
	
	void method2();
}

//B now includes method1 and method2
interface B  extends A{
	void method3();
}

//the class must implement all method of A and B.

public class ExtendedInterface implements B {

	@Override
	public void method1() {
		System.out.println("Calling Method 1 ....");		
	}
	
	@Override
	public void method3() {
		System.out.println("Calling Method 3 ....");		
	}
	
	@Override
	public void method2() {
		System.out.println("Calling Method 2 ....");		
	}
	
	public static void main(String[] args) {

        // Instance of  ExtendedInterface class created
		ExtendedInterface ei = new ExtendedInterface();
		
		ei.method1();
		ei.method2();
		ei.method3();
		
		
	}

}
