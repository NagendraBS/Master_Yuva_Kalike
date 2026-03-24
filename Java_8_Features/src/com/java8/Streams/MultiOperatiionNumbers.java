package com.java.streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MultiOperatiionNumbers {

	//Java 8 program to map integers to their squares and print results.
	
	public static void main(String[] args) {

		List<Integer> numbers = Arrays.asList(4,1,2,7,9,3);
		
		numbers.stream().map(num -> num*num).forEachOrdered(System.out::println);
		
		List<Integer> SquareOfEven =  numbers.stream().filter(n -> n % 2 == 0).map(nu -> nu * nu).collect(Collectors.toList());
		
		System.out.println(SquareOfEven);
		
		// print maximum value From the List
		
		int maxNumber = SquareOfEven.stream().max(Integer::compare).get();
		System.out.println(maxNumber);
		
		
		
		
	}

}
