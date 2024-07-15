package com.mvn.core.spring;
// Java Program to Illustrate Airtel Class

// Class
// Implementing Sim interface
public class Airtel implements Sim {


	public void calling(String sim)
	{
		System.out.println("Airtel Calling" +sim);
	}

	 
	public void data()
	{
		System.out.println("Airtel Data");
	}
}
