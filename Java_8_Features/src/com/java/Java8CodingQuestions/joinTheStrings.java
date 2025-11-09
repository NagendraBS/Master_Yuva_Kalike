package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class joinTheStrings {

	public static void main(String[] args) {

		List<String> listOfStrings = Arrays.asList("Facebook", "Twitter", "YouTube", "WhatsApp", "LinkedIn");
		
		System.out.println(listOfStrings);
		
		String joinedString = listOfStrings.stream().collect(Collectors.joining("|", "[{(", ")}]"));
		
		System.out.println(joinedString);
		
		
//		1. joining StringsA
		
		String s1 = "Nagendra";
		String s2 = "Murthy";
		
		String result = Stream.of(s1,s2.toUpperCase()).collect(Collectors.joining());
		
		System.out.println(result);
		
		
	}

}
