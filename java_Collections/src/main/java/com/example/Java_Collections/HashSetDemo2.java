package com.example.Java_Collections;

import java.util.HashSet;

public class HashSetDemo2 {

	public static void main(String[] args) {
		
		HashSet<Integer> evenNumber = new HashSet<Integer>();
		
		evenNumber.add(8);
		evenNumber.add(10);
		evenNumber.add(4);
		evenNumber.add(2);
		evenNumber.add(6);

		System.out.println("even Numbers are :" + evenNumber);

		HashSet<Integer> numbers = new HashSet<Integer>();
		
		numbers.addAll(evenNumber);
		numbers.add(12);
		
		System.out.println("New HashSet : " + numbers);
		
		
		// removing Elements From hashSet
		
		evenNumber.remove(4);
		
		System.out.println(evenNumber);
		System.out.println(numbers);
		
		numbers.remove(10);
		
		System.out.println(numbers);		
		System.out.println(evenNumber);
		
		
		
		
		
	}

}
