package com.java.DataTypes;

public class NarrowTypeCasting {

	public static void main(String[] args) {

		double i = 500.123;
		
        // Narrowing Type Casting 
		short j = (short) i;
		
		int k = (int) i;
		
		long l = (long) i;
		
		System.out.println("Original value before typeCasting : " + i);
		System.out.println("After typeCasting to short : " + j);
		System.out.println("After typeCasting to int : " + k);
		System.out.println("After typeCasting to long : " + l);
		
	}

}
