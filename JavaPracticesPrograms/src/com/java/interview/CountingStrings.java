package com.java.interview;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CountingStrings {

	public static void main(String[] args) {

	List<String> items = Arrays.asList("apple","banana","grapes","apple","banana","banana","grapes");

	Map<String, Long> Countingitems = items.stream().filter(s -> s.length() <= 5).collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
	
	System.out.println(Countingitems);
	
	Set<String> uniqueItems = new HashSet<String>(items);
	
	System.out.println("uniqueItems : " + uniqueItems );

	
	List<Integer> numbers = Arrays.asList(1,2,3,2,3,4,5,6);

	
	List<Integer> uniquenumbers = numbers.stream().distinct().collect(Collectors.toList());
	
	
	System.out.println(uniquenumbers);
	
	
	List<Integer> integers = Arrays.asList(2,4,7,8);
	
	
	System.out.println("Square of Numbers : ");
	for(Integer num : integers) {
		
		int sqr = num * num;
		
		if(sqr < 50) {
			System.out.println(sqr);
		}
		
	}
	
	
	System.out.println("Using Streams : ");
	
	List<Integer> sqr = integers.stream().map(e -> e * e).filter(s -> s < 50).collect(Collectors.toList());
	
	System.out.println(sqr); 
	
	
	int a = 10;
	Integer a1 = 10;
	
	System.out.println(a1 == a);
	
	
	
	}

}
