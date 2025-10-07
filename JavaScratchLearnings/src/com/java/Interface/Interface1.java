package com.java.Interface;




interface Vehicle {

	// Abstract methods defined
	public void changeGear(int a);

	public void speedUp(int a);

	public void applyBrakes(int a);

}

//Class implementing vehicle interface
class Bicycle implements Vehicle {

	int speed;
	int gear;

	// Change gear
	@Override
	public void changeGear(int newGear) {

		gear = newGear;
	}

	// Increase speed
	@Override
	public void speedUp(int increment) {

		speed = speed + increment;
	}

	// Decrease speed
	@Override
	public void applyBrakes(int decrement) {

		speed = speed - decrement;
	}


	public void printState() {
		System.out.println( "Bicycle [speed = " + speed + ", gear = " + gear + "]" );
	}

}

//Class implementing vehicle interface
class Bike implements Vehicle {

	int speed;
	int gear;

	// Change gear
	@Override
	public void changeGear(int newGear) {
		gear = newGear;
	}

	// Increase speed
	@Override
	public void speedUp(int increment) {
		speed = speed + increment;
	}

	// Decrease speed
	@Override
	public void applyBrakes(int decrement) {
		speed = speed - decrement;
	}

	public void printState() {
		System.out.println( "Bike [speed = " + speed + ", gear = " + gear + "]" );
	}

}

public class Interface1 {

	public static void main(String[] args) {

		Bicycle bicycle = new Bicycle();
		
		bicycle.changeGear(3);
		bicycle.speedUp(25);
		bicycle.applyBrakes(10);
		
		System.out.println("BiCycle Present State : " );
		bicycle.printState();
		
		System.out.println();
		
		Bike bike = new Bike();
		
		 bike.changeGear(4);
		 bike.speedUp(50);
		 bike.applyBrakes(10);
		 
		 System.out.println("Bike Present State : ");
		 bike.printState();
		
		
	}

}
