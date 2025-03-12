package com.java.ParameterPassingTechniques;

public class PassByValue {

	public static void main(String[] args) {

		int x = 10;
		modifyValue(x);
		System.out.println(x);
		
	}
	
	public static void modifyValue(int value) {
		System.out.println("First Value : " + value);
		value = 20;
		System.out.println("value : " + value);
	}

}
