package com.springcore.Autowiring.byType;

public class Address {

	//Member Variables
	private String street;
	private String city;
	
	
	//Getters and Setters
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
	//tostring

	@Override
	public String toString() {
		return "Address [street=" + street + ", city=" + city + "]";
	}
	
	
}
