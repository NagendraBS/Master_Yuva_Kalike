package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.List;

public class MultiplesOfNumbers {

	public static void main(String[] args) {

		List<Integer> listOfIntegers = Arrays.asList(45, 12, 56, 15, 24, 75, 31, 89,140);
		
		listOfIntegers.stream()
						.filter(i -> i % 5 == 0)
						.forEach(System.out::println);
		
		
	}

}
