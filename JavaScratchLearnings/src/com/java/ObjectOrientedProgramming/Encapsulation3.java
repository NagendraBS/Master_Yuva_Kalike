package com.java.ObjectOrientedProgramming;

class Account {

	// Private data members (encapsulated)
	private long accNo;
	private String name;
	private String email;
	private float amount;

	// Public getter and setter methods (controlled access)
	public long getaccNo() {
		return accNo;
	}

	public void setaccNo(long accNo) {
		this.accNo = accNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

}

public class Encapsulation3 {

	public static void main(String[] args) {

		Account ac = new Account();

		// Set values using setter methods (controlled access)
		ac.setName("Galaxe Solutions");
		ac.setaccNo(93748292474L);
		ac.setEmail("GalaxE@gmail.com");
		ac.setAmount(100000f);

		// Get values using getter methods
		System.out.println("Account Number: " + ac.getaccNo());
		System.out.println("Name: " + ac.getName());
		System.out.println("Email: " + ac.getEmail());
		System.out.println("Amount: " + ac.getAmount());

	}

}
