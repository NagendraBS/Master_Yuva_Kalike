package com.java.Method;

public class MemoryAllocations {

	//Memory Allocation for Methods Calls

	public int num ; 
	public String n;
	
	
    // Accessor (getter) methods
	public int getNumber() {
		return num;
	}
	
	public String getName() {
		return n;
	}

	
    // Mutator (setter) methods
	public void setNumber(int num) {
		this.num = num;
	}
	
	public void setName(String n) {
		this.n = n;
	}
	
	
	//Other Methods
	public void printDetails() {
		System.out.println("Number : " + num);
		System.out.println("Name : " + n);
	}


	public static void main(String[] args) {

		MemoryAllocations ma = new MemoryAllocations();
		
//		ma.getName();
//		ma.getNumber();
		
		// Setting Values to the Fileds
		ma.setName("Nagendra");
		ma.setNumber(2000);

		ma.printDetails();
		
//		In the above example, the MemoryAllocations class contains private fields num and n, 
//		with getter and setter method to access and modify their values. 
//		The printDetails() method prints the values of num and n to the console. 
//		In the main method, the setNumber, setName, and printDetails methods are called 
//		to set and display the object’s details.
		
		
	}

}
