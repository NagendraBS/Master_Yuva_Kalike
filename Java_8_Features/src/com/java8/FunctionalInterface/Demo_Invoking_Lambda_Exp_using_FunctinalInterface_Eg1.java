package com.java8.FunctionalInterface;

@FunctionalInterface
interface Interf1{
	public void add(int a, int b);
}


public class Demo_Invoking_Lambda_Exp_using_FunctinalInterface_Eg1 {

	public static void main(String[] args) {

		Interf1 i = (a, b) -> System.out.println("The Sum : " + (a + b));
		
		i.add(10, 20);
		i.add(100, 200);
		
	}

}
