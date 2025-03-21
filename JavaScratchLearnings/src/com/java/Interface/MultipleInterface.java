package com.java.Interface;

//MultipleInheritanceUsingInterface

//Add interface
interface Add{
	
	public int add(int a, int b);
}

//Sub interface
interface Sub{
	
	public int sub(int a, int b);
}


class Calculation implements Add, Sub{

	@Override
	public int sub(int a, int b) {
		return a - b;		
	}

	@Override
	public int add(int a, int b) {

		return a + b;
	}
	
}

public class MultipleInterface {

	public static void main(String[] args) {

		Calculation cal = new Calculation();
		
		System.out.println("Addition : " + cal.add(2, 1));
		
		System.out.println("Substraction : " + cal.sub(1, 2));
		
		
	}

}
