package com.java.streams;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CountingDuplicatesStrings {

	public static void main(String[] args) {
		
		List<String> list = Arrays.asList("john", "johnny", "jackie", "johnny", "john", "jackie", "jamie", "jamie",
		        "john", "johnny", "jamie", "johnny", "john");
		 	
		Map<String, Long> map =  list.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
		System.out.println(map);
		
		long maxCount = map.values().stream().max(Long::compare).orElse(0L);
		
		
		List<Entry<String, Long>> entryList = map.entrySet().stream().filter(entry -> entry.getValue() == maxCount).collect(Collectors.toList());
		
		System.out.println(entryList);
		System.out.println("-----------");
		entryList.forEach(System.out::println);
	
		Entry<String, Long> winner =  entryList.stream().min(Comparator.comparingInt(entry -> entry.getKey().length())).orElseThrow();
		
		System.out.println(" Winner is " + winner.getKey() + " with : " + winner.getValue() + "Votes");
		
		
	}

}
