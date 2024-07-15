package com.springcore.beanScopeTypePrototype;


	//Java program to illustrate a bean
	//created in the spring framework
	public class HelloWorld {

		public String name;

	// Create a Setter method to set the value passed by the User
		
		public String getName() {
			return name;
		}

	//Create the Getter Method , so that the User Can get the Set Value	
		public void setName(String name) {
			this.name = name;
		}
		
}
