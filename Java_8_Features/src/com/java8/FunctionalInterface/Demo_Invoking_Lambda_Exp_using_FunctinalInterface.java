package com.java8.FunctionalInterface;

@FunctionalInterface
interface Interf{       // Functional Interface
	public void m1();
}


public class Demo_Invoking_Lambda_Exp_using_FunctinalInterface {

	public static void main(String[] args) {
		
		// Invoking the Lambda Expresiion Using the Reference of Functional Interface.

		Interf i = ()-> System.out.println("Lambda Expression implementation");  
		i.m1();
		
	}

}
