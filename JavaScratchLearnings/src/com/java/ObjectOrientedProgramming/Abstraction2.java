package com.java.ObjectOrientedProgramming;


abstract class Animal{
	
	String name;
	
	public Animal(String name) {
		this.name = name;
	}
	
	
	public abstract void makeSound();
	
	public String getName() {
		return name;
	}
	
}

//Abstracted class
class Dog extends Animal{
	
	public Dog(String name) {
		super(name);
	}
	
	
	public void makeSound()
	{
		System.out.println(getName() + " Barks");
	}
	
}


//Abstracted class
class Cat extends Animal{
	
	public Cat(String name) {
		super(name);
	}
	
	
	public void makeSound() {
		System.out.println(getName() + " Meow");
	}
	
}


//Driver  Class
public class Abstraction2 {

	public static void main(String[] args) {

		Animal myDog = new Dog("Tommy");
		
		Animal myCat = new Cat("PussyCat");
		
		myDog.makeSound();
		
		myCat.makeSound();
		
	}

}
