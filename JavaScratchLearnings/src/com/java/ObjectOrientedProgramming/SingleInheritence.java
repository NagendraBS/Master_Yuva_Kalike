package com.java.ObjectOrientedProgramming;

//Single Inheritence

//Parent Class
class One {
	public void print_geeks() {
		System.out.println("Geeks");
	}

}

//Child Class/ Derived Class
class Two extends One{

	public void print_for() {
		System.out.println("for");
	}
	
}

//Main Driver Method
public class SingleInheritence {

	public static void main(String[] args) {

		Two g = new Two();
		g.print_geeks();
		g.print_for();
		g.print_geeks();
		
	}

}
