package com.java.Interface;

import java.lang.invoke.SerializedLambda;

//Marker Interface in Java is an empty interface means having no field or methods.
//Examples of marker interface are Serializable, Cloneable and Remote interface.
//All these interfaces are empty interfaces. 

interface Serializable {
	// Marker Interface
}

//Define Person class that implements
//the marker interface
class Person implements Serializable {

	public Person() {
		System.out.println("Person Object Created");
	}

}

//Define Animal class does not
//implement marker interface
class Animal {

	public Animal() {
		System.out.println("Animal Object Created");
	}
}

public class Marker_Interface {

	public static void main(String[] args) {

		Person person = new Person();
		Animal animal = new Animal();
		
		
		if(person instanceof Serializable) {
			System.out.println("Person is serializable");
		}else {
			System.out.println("Person is Not serializable");
		}
		
		
		 if (animal instanceof Serializable)
	            System.out.println("Animal is serializable");
	        else
	            System.out.println("Animal is not serializable");
		
	}

}
