package com.java.interview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;import java.util.stream.Collector;
import java.util.stream.Collectors;

public class RemoveDuplicatesfromArrayList {

	public static void main(String[] args) {

		List<Integer> listwithDuplicates = Arrays.asList(2,4,8,1,2,4,7,8,6,3);
		
//		APPROACH - 1
		
		// Passing list to Set to Ensure Only the Unique Elements should present
		
//		Set<Integer> set = new LinkedHashSet<Integer>(listwithDuplicates); 
//		List<Integer> listwithNODuplicates = new ArrayList<Integer>(set);
//		Collections.sort(listwithNODuplicates);
//		
//		System.out.println(listwithNODuplicates);
		
		
//			APPROACH - 2
		
		
		List<Integer> listNoDumplicates = listwithDuplicates.stream().distinct().collect(Collectors.toList());
		
		Collections.sort(listNoDumplicates);
		
		System.out.println(listNoDumplicates);
 
}
}