package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class RemoveDuplicateElements {

	public static void main(String[] args) {

		List<String> listofStrings = Arrays.asList("Java", "Python", "C#", "Java", "Kotlin", "Python");
		
		List<String> DuplicateRemovedList = listofStrings.stream().distinct().collect(Collectors.toList());
		
		System.out.println("DuplicateRemovedList : " + DuplicateRemovedList) ;
	}

}
