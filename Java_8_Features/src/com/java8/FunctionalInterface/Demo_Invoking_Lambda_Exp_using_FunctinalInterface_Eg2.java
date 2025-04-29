package com.java8.FunctionalInterface;

@FunctionalInterface
interface Interf3{
	public int getLength(String s);
	
}


public class Demo_Invoking_Lambda_Exp_using_FunctinalInterface_Eg2 {

	public static void main(String[] args) {

		System.out.println("Invoking Lambda");
		
		Interf3 i = s->s.length();
		System.out.println(i.getLength("Hello"));
		System.out.println(i.getLength("With Lambda Expresiion"));
		
	}

}
