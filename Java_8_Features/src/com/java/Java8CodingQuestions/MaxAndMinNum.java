package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class MaxAndMinNum {

	public static void main(String[] args) {

		List<Integer> listOfIntegers = Arrays.asList(45, 12, 56, 15, 24, 75, 31, 89,140);
		
		Integer maxNum = listOfIntegers.stream().max(Comparator.naturalOrder()).get();
		
		System.out.println("Maximum Number : " + maxNum);
		
 		Integer minNum = listOfIntegers.stream().min(Comparator.naturalOrder()).get();
		
 		System.out.println("Minimum Number : " + minNum);
		
 		
 		System.out.println("----------------------------------");
 		
 		// 3 Min Numbers
 		
 		List<Integer> minNumbers = listOfIntegers.stream()
 									.sorted().limit(3).collect(Collectors.toList());
 		System.out.println("minNumbers : " + minNumbers);
 		
 		// 3 Max Numbers
 		
 		List<Integer> maxNumbers = listOfIntegers.stream()
 												.sorted(Comparator.reverseOrder()).limit(3).collect(Collectors.toList());
 		System.out.println("maxNumbers : " + maxNumbers);
 		
 		
	}

}
