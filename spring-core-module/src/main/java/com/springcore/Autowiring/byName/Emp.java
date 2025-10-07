package com.springcore.Autowiring.byName;

//Autowiring  By XML Configuration Method.

//Autowiring Will Inject dependencies to Beans Automatically



public class Emp {

	//Member variable
	private Address address;

	
	// Getters and Setters
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	// Default Constructor
	public Emp() {
		// TODO Auto-generated constructor stub
	}

	// Parameterized Constructor
	public Emp(Address address) {
		super();
		this.address = address;
	}

	//tostring 

	@Override
	public String toString() {
		return "Emp [address=" + address + "]";
	}
	
	
	
	
	
	
}
