package com.java.Interface;


interface testInterface{

    // public, static and final
	final int a=10;
	
    // public and abstract
	public void display();
	
}

//Class implementing interface
class TestClass implements testInterface{
	
	// Implementing the capabilities of Interface
	public void display() {
		System.out.println("GalaxE and Enadav Company");
	}
	
}

public class Interface {

	public static void main(String[] args) {

		TestClass tc = new TestClass();
		
		tc.display();
		System.out.println(tc.a);
		
	}
	
	

}
