package com.java.MethodCalling;

public class UserDefinedMethod {

	public void hello() {
		System.out.println("This is a User-Defined Method.");
		
	}
	
	public static void main(String[] args) {

		//creating an Object to Call the userDefined method
		UserDefinedMethod udm = new UserDefinedMethod();
		
        // Call the method
		udm.hello();
		
	}

}
