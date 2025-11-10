package com.java.Interface;

//define static methods in interfaces that can be called independently without an object.

interface Test{
	
	final int a = 10;
	
	static void display() {
		System.out.println("Hello Static Method Interface");
	}
}

<<<<<<< HEAD
public class StaticMethod_Interface  implements TestInterface{
=======
public class StaticMethod_Interface  implements Test{
>>>>>>> c31056408ac2fd8628fca7a7112e8a19a25609d3

	public static void main(String[] args) {

		Test.display();
		
	}

}
