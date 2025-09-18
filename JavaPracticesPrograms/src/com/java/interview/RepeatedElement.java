package com.java.interview;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.stream.Collectors;

public class RepeatedElement {

	
	public static void main(String[] args) {

		List<String> listofStrings = Arrays.asList("Pen", "Eraser", "Note Book", "Pen", "Pencil", "Pen", "Note Book", "Pencil");
		
		Map<String, Long> elementCount = listofStrings.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
		
		System.out.println(elementCount);
		
		Entry<String, Long> mostRepeatedElement =   elementCount.entrySet().stream().max(Map.Entry.comparingByValue()).get();	
		
		System.out.println("Most Repeated Elemet : " + mostRepeatedElement.getKey());
		System.out.println("Most Repeated Elemet Count : " + mostRepeatedElement.getValue());
	}

}
