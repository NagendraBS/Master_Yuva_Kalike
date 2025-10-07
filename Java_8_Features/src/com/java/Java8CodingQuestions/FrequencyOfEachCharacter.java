package com.java.Java8CodingQuestions;

import java.io.InputStream;
import java.util.function.Function;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class FrequencyOfEachCharacter {

	public static void main(String[] args) {

		String inputString = "Frequency Of Each Character";


		// Iteration of Char Array

//		for (char ch : inputString.toCharArray()) {
//			System.out.println(ch);
//		}

		Map<Character, Long> FrequencyOfEachCharacter = inputString.chars().mapToObj(c -> (char) c)
				.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

		System.out.println("FrequencyOfEachCharacter : " + FrequencyOfEachCharacter);
		
		

	}

}
