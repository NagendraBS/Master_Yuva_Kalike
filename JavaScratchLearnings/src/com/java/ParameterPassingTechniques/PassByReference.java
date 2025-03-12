package com.java.ParameterPassingTechniques;

	class Car{
		String name;
		float mileage;
		int cost;
	}
	
public class PassByReference {

	
	public static void main(String[] args) {

		Car a = new Car();
		a.name = "BMW";
		a.mileage = 5.5f;
		a.cost = 75;
		
		System.out.println(a.name);
		System.out.println(a.mileage);
		System.err.println(a.cost);
		
		Car b;
		b = a ;  // Pass By Reference, Reference "a" is Assigned to reference "b" . 
		
		System.out.println("Reference \"a\" is Assigned to reference \"b\"");
		
		System.out.println(b.name);
		System.out.println(b.mileage);
		System.out.println(b.cost);
		
		b.name = "TATA";
		b.mileage = 18.5f;
		b.cost = 35;
		
		System.out.println("Changed the field values of the objects");
		System.out.println(b.name);
		System.out.println(b.mileage);
		System.out.println(b.cost);
		
		System.out.println("Verfying the ");
		
	}
}
