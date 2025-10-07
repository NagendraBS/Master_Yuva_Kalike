package com.java.ObjectOrientedProgramming;

abstract class Shape {
    String color;

    // these are abstract methods
    abstract double area();
    public abstract String toString();

    // abstract class can have the constructor
    public Shape(String color)
    {
        System.out.println("Shape constructor called");
        this.color = color;
    }

    // this is a concrete method
    public String getColor() 
    { 
    	return color;
    	}
}


class Circle extends Shape{
	
	double radius;
	
	
	public Circle(String color, double radius) {
		
        // calling Shape constructor
		super(color);
		System.out.println("Circle Constructor Called....");
        this.radius = radius;
	}

	@Override
	double area() {
		
		return (Math.PI * Math.pow(radius, 2));
	}
	
	@Override
	public String toString() {
		
		return ("Circle Color is : " + super.getColor() + ", " + "Area of Circle is : " + area());
		
	}
	
}


class Rectangle extends Shape{
	
	double lenght;
	double width;
	
	public Rectangle(String color, double length, double width) {
		
		super(color);
		this.lenght = length;
		this.width = width;
		System.out.println("Rectangle Constructor Called....");
		
	}
	
	@Override
	double area() {
		return (lenght * width);
	}
	
	@Override
	public String toString() {
		return("Rectangle Color is : "+ super.getColor() + "," + " Area of Rectangle is :" + area());
	}
	
	
}


public class Abstraction1 {

	public static void main(String[] args) {

		//Object Created for Circle Class extends Shape Class
		Shape s1 = new Circle("Blue", 2);
				
		//Object Created for Rectangle Class extends Shape Class
		Shape s2 = new Rectangle("Green", 12, 6);
		
		
		System.out.println(s1.toString());
		
		System.out.println(s2.toString());
		
	}

}
