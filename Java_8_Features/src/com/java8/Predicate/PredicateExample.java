package com.java8.Predicate;

import java.util.function.Predicate;

public class PredicateExample {

	public static void main(String[] args) {

		int[] x = {0, 5, 10, 15, 20, 25, 30};

		// To Check given Number in the int Array are greater than 10 or not
		Predicate<Integer> p1 = x1 -> x1>10;

		//To Check the given number is even Or Not
		Predicate<Integer> p2 = x1 -> x1%2==0 ;

		Predicate<String> isHello = Predicate.isEqual("hello");



		System.out.println(" The Numbers Greater than 10 are : ");
		m1(p1, x);

		System.out.println(" The Numbers which are Even are : ");
		m1(p2, x);

		System.out.println("The Number Should be Geater than 10  and Should be Even are : ");
		m1(p1.and(p2), x);   // logical AND

		System.out.println("The Number Should be Geater than 10  OR Should be Even are : ");
		m1(p1.or(p2), x);    //  logical OR

		System.out.println("The Number whih are Not Greater than 10 are : ");
		m1(p1.negate(), x);  // Logical Compliment result of Predicate p1 here.

		System.out.println("isEqual Method");
		System.out.println(isHello.test("hello"));
		System.out.println(isHello.test("Hello"));
		System.out.println(isHello.test("Bye"));

	}

	public static void m1(Predicate<Integer> p , int[] x) {

		for(int x2 : x) {
			if(p.test(x2))
			{
			System.out.println(x2);
			}
		}


	}

}
