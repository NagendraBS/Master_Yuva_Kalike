package com.java.Exceptions_Top10;

public class AssertionError_Demo {

	public static void main(String[] args) {

		int x = 10;

		// Since, by Default assertion statement  are disabled will not get any Error by Running this Code
		// we Need to Enable Assertion like  in CMD --> [ java -ea AssertionError_Demo  ]
		
		assert (x > 10);  
	}

}
