package com.java.Classes_AND_Objects;

public class Dog {

	// Instance variables
	String name;
	String breed;
	int age;
	String color;

	// Constructor Declaration of Class
	Dog(String name, String breed, int age, String color) {

		this.name = name;
		this.breed = breed;
		this.age = age;
		this.color = color;
	}

	public String getname() {
		return name;
	}

	public String getbreed() {
		return breed;
	}

	public int getage() {
		return age;
	}

	public String getcolor() {
		return color;
	}

	@Override
	public String toString() {
		return ("Name is : " + this.getname() + "\n Breed , Age, Color are : " + this.getbreed() + " ," + this.getage()
				+ " ," + this.getcolor());

	}

	public static void main(String[] args) {

		Dog tuffy = new Dog("Tuffy", "GermenShepherd", 7, "black");

		System.out.println(tuffy.toString());

	}

}
