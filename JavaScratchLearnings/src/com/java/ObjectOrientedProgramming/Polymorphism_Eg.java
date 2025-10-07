package com.java.ObjectOrientedProgramming;


//Parent Class
 class Parent{
	 
	 //Method Declaration
	 public void func() {
		 System.out.println("Parent Method Function ");
	 }
	 
	 
	 //Method Overloading
	 public void func(int a) {
		 System.out.println("Parent Method Function " + a);
	 }
	
}
 
 
//Child Class
 class Child extends Parent{
	 
	// Child Method
	 @Override
	 public void func(int a) {
		 System.out.println("Child Method " + a);
	 }
 }

public class Polymorphism_Eg {

	public static void main(String[] args) {

		Parent obj = new Child();
		obj.func(4);
		
	}

}
