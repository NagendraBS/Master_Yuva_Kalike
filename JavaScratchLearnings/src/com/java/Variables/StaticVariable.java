package com.java.Variables;

public class StaticVariable {

	public static String StVariable = "Yuvaraj";
	
	public static void main(String[] args) {

		//Calling Static variable -- 1
		System.out.println("Static Variable is : " + StVariable);
		
		//Calling Static variable -- 2
		System.out.println("Static Variable is : " + StaticVariable.StVariable);
		
	}

}
