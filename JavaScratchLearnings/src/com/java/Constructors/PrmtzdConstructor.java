package com.java.Constructors;

class Geeks {

	String name;
	int id;

	Geeks(String name, int id) {
		this.name = name;
		this.id = id;
	}

	@Override
	public String toString() {
		return "Geeks [name=" + name + ", id=" + id + "]";
	}

}

public class PrmtzdConstructor {

	public static void main(String[] args) {

		Geeks geek = new Geeks("Yuvaraj", 501);

		// Calling toString() method explicitly
		System.out.println(geek.toString());

		// Calling toString() method implicitly
		System.out.println(geek);

	}

}
