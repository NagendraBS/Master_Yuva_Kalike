package com.java.interview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountingcharactersInString {

	public static void main(String[] args) {

		List<String> names = Arrays.asList("Nagendra", "Manikanta", "Srinivasa");
		
		
		Iterator<String> itr = names.iterator();
		
		while(itr.hasNext()) {
			
			String name = itr.next();
			System.out.println(name);
			
			String cleanName = name.toLowerCase();
			
			System.out.println("cleanName : " +cleanName);
			
				
			char[] charArray = cleanName.toCharArray();
			
			List<Character> charList = new ArrayList<Character>();
			
			for(char c : charArray) {
			
				charList.add(c);
			}
			
			System.out.println("charList : " +charList);
			

			
			Map<Character, Long> charCount = charList.stream()
													.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
										
			System.out.println(charCount);
			System.out.println(" ");
			
			
			
			
			
		}

	}
}
