package com.java.MethodCalling;

class Instance{
	
	String n ;
	
	public void test(String n) {
		this.n = n;
	}
	
}


public class InstanceMethod {

	public static void main(String[] args) {

		//Created an Object for the Test Class
		Instance objT = new Instance();
		
		//Calling an Instance method from class Test
		 objT.test("Endava");
		 
		 System.out.println(objT.n);
		
	}

}
