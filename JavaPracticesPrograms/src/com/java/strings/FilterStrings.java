package com.java.strings;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FilterStrings {

	public static void main(String[] args) {

		List<String> fruits = Arrays.asList("apple", "banana", "avocado", "blueberry", "apricot");
		
		List<String> listStartswithA = fruits.stream().filter(f -> f.startsWith("a")).collect(Collectors.toList());
		System.out.println(listStartswithA);
		
		List<String> result = listStartswithA.stream().map(u -> u.toUpperCase()).sorted().collect(Collectors.toList());
		System.out.println(result);
		
	}

}
