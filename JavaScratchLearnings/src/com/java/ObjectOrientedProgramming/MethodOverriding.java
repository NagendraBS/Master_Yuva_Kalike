package com.java.ObjectOrientedProgramming;


class Animal1{
	// Base class
    public void move() { System.out.println(
      "Animal is moving."); }
   public void eat() { System.out.println(
      "Animal is eating."); }
}


class Dog1 extends Animal1{
	
	// move method from Base class is overriden in this
    // method
	
	@Override
	public void move()
    { 
        System.out.println("Dog is running.");
    }
	
   public void bark() { System.out.println("Dog is barking."); }
}

public class MethodOverriding {

	public static void main(String[] args) {

		Dog1  d = new Dog1();
		
		d.move();  // Output: Dog is running.
		d.bark();  // Output: Dog is barking.
		d.eat();   // Output: Animal is eating.
	}

}
