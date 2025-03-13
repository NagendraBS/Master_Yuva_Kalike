package com.java.Operator;

public class AssignmentOperator {

	public static void main(String[] args) {

		int f = 7;
		
		System.out.println("f += 5 : " + (f += 5));    // f = f + 5 ;
		System.out.println("f -= 5 : " + (f -= 5));
		System.out.println("f *= 5 : " + (f *= 5));		// f = 35;
		System.out.println("f /= 5 : " + (f /= 5));    // f = f / 5 ;
		System.out.println("f %= 5 : " + (f %= 5));    // f = f % 5 ;
		// f = 2 ;
		System.out.println();
		
		
	}

}
