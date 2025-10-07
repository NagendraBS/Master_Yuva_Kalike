package com.java.Interface;

//define static methods in interfaces that can be called independently without an object.

interface Test{
	
	final int a = 10;
	
	static void display() {
		System.out.println("Hello Static Method Interface");
	}
}

public class StaticMethod_Interface  implements Test{

	public static void main(String[] args) {

		Test.display();
		
	}

}
