package com.springcore.propertySource;

public class Product {

	//Member Variables of the Class
	private String name;
	private double price;
	private int discount;
	
	//default Constructor 
	public Product() {
		// TODO Auto-generated constructor stub
	}

	//Generated Parameterized Constructor
	public Product(String name, double price, int discount) {
		super();
		this.name = name;
		this.price = price;
		this.discount = discount;
	}
	
	
	//Generated Getters and Setters
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	@Override
	public String toString() {
		return name + " " + price + " - " + discount + "% discount!";
	}
	
	
	
	
	
	
}
