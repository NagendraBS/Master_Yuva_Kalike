package com.java.ObjectOrientedProgramming;


class Bicycle{
	
	// Bicycle Class has Two Fileds
	int gears;
	int speed;
	
    // the Bicycle class has one constructor
	public Bicycle(int gears, int speed) {
		this.gears = gears;
		this.speed = speed;
	}
	
	
    // the Bicycle class has three methods
	public void applyBrakes(int decrement) {
		speed = speed - decrement;
		
	}
	
	public void speedUp(int increment) {
		speed = speed + increment;
	}
	
    // toString() method to print info of Bicycle
	public String toString() {
		return ("No of Gears : " + gears + "\n" + "Speed of Bicycle : " + speed);
	}
	
	
}



class MountainBike extends Bicycle{

    // the MountainBike subclass adds one more field
	int seatHeight;
	
    // the MountainBike subclass has one constructor
	public MountainBike(int gears, int speed, int seatHeight) {
		super(gears, speed);
		this.seatHeight = seatHeight;
	}
	
    // the MountainBike subclass adds one more method
	public void setHeight(int newValue) {
		seatHeight = newValue;
	}
	
	
	// overriding toString() method
    // of Bicycle to print more info
	
	@Override
	public String toString() {
		return (super.toString() + "\n" + "SeatHeight : " + seatHeight);
				
	}
	
	
}

public class Inheritence {

	public static void main(String[] args) {

		MountainBike mb = new MountainBike(3, 100, 15);
		
//		Bicycle mb = new MountainBike(3, 100, 15);

		
		System.out.println(mb);
	}

}
