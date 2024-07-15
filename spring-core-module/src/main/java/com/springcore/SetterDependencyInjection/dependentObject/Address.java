package com.springcore.SetterDependencyInjection.dependentObject;

public class Address {

	private String houseNo;
	private String pincode;
	private String state;
	private String country;
	
	public Address() {
		// TODO Auto-generated constructor stub
	}
	
	
	public String getHouseNo() {
		return houseNo;
	}


	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}


	public String getPincode() {
		return pincode;
	}


	public void setPincode(String pincode) {
		this.pincode = pincode;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	// Main Purpose of Constructor is to initialize the Object of this Class
	public Address(String houseNo, String pincode, String state, String country) {
		super();
		this.houseNo = houseNo;
		this.pincode = pincode;
		this.state = state;
		this.country = country;
	}
	
	
	public String toString() {
		return "[" + houseNo + "," + pincode + "," + state + "," +  country + "]" ;
	}
	
	
	
	
}
