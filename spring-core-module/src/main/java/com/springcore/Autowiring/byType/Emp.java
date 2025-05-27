
package com.springcore.Autowiring.byType;

import org.springframework.beans.factory.annotation.Qualifier;

public class Emp {

	//Member Varaibles
	private Address address1;
	
	private Address address2;
	
	//Getters and Setters
	
	public Address getAddress1() {
		return address1;
	}
	public void setAddress1(Address address1) {
		this.address1 = address1;
	}
	public Address getAddress2() {
		return address2;
	}
	public void setAddress2(Address address2) {
		this.address2 = address2;
	}
	
	//parameterized Constructor
	public Emp(Address address1, Address address2) {
		super();
		this.address1 = address1;
		this.address2 = address2;
	}
	
	// Default Constructor
	public Emp() {
		// TODO Auto-generated constructor stub
	}
	
	
	//toString
	@Override
	public String toString() {
		return "Emp [address1=" + address1 + ", address2=" + address2 + "]";
	}

	
}
