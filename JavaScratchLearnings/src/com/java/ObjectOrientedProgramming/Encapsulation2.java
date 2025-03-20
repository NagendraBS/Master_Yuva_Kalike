package com.java.ObjectOrientedProgramming;

//Encapsulating the name and age
// only approachable and used using
// methods defined
class Person{
	
	String name;
	int age;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getAge() {
		return age;
	}
	
	public void setAge(int age) {
		this.age = age;
	}
	
}


//Driver Class

public class Encapsulation2 {

	public static void main(String[] args) {

        // person object created
	 Person p = new Person();
	 
	 p.setName("Kiran");
	 p.setAge(25);
	 
	// Using methods to get the values from the
     // variables
	 System.out.println("Name : " + p.getName());
	 System.out.println("Age : " + p.age);
	 
		
		
	}

}
