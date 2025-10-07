package com.java.streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FilterEvenNumbers {

	// Java 8 program to filter and print even numbers from a list.
	
	public static void main(String[] args) {

		List<Integer> number = Arrays.asList(1,2,3,42,5,6);
		
		List<Integer>  EvenNumbers =  number.stream().filter(num -> num % 2 == 0).collect(Collectors.toList());
		
		System.out.println("EvenNumbers : " + EvenNumbers );
		
		
		
	}

}
 