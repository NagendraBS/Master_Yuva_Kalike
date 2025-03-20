package com.java.ObjectOrientedProgramming;

abstract class Electric{
	
	abstract void turnOn();

	abstract void turnOff();
	
	void Power() {
		System.out.println("Turned ON Power Initially ,.....");
	}
}


//Concrete class implementing the abstract methods
class TVRemote extends Electric {
	
	@Override
	void turnOn() {
		System.out.println("TV is turned ON");
	}
	
	@Override
	void turnOff() {
		System.out.println("TV is turned OFF");
	}
	
}


//Main class to demonstrate abstraction
public class Abstraction {

	public static void main(String[] args) {

		TVRemote remote = new TVRemote();
		
		remote.Power();
		
		remote.turnOn();
		
		remote.turnOff();
			
		
		
	}

}
