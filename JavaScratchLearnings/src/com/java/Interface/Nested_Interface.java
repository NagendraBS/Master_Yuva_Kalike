package com.java.Interface;

//Parent Class
class Parent {

	// Nested Interface
	interface Test {
		public void show();
	}
}

//Child Class
class Child implements Parent.Test {

	@Override
	public void show() {
		System.out.println("Show Method of Interface");
	}

}

public class Nested_Interface {

	public static void main(String[] args) {

		Parent.Test obj;

		Child t = new Child();

		// Initializing the Child Reference to Obj
		obj = t;

		obj.show();

	}

}
