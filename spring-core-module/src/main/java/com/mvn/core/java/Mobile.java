package com.mvn.core.java;

// Java Program to Illustrate Mobile Class

//Class
public class Mobile {

	// Main driver method
	public static void main(String[] args)
	{

		// Creating instance of Sim interface
		// inside main() method
		// with reference to Jio class constructor
		// invocation
//		Sim sim = new Jio();

		 Sim sim = new Airtel();

		sim.calling();
		sim.data();
	}
}
