package com.java.interview;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

//Find and print the duplicate numbers only once.

public class DuplicatesFinderUsingIntegers {

	public static void main(String[] args) {

		List<Integer> numbers = Arrays.asList(4, 2, 5, 2, 6, 4, 7, 8);

		Set<Integer> seen = new HashSet<>();
		Set<Integer> duplicates = new HashSet<Integer>();
		
			for(Integer num : numbers) {
				
				if(!seen.add(num)) {
					duplicates.add(num);
				}
			}
			
		List<Integer> duplicatesFromList = new LinkedList<Integer>(duplicates);
			System.out.println("duplicatesFromList : " + duplicatesFromList);
		
	}

}
