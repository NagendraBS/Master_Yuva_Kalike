package com.java.streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ConcatenationJoiningString {

	public static void main(String[] args) {

		String str1 = "NAGENDRA";
		String str2 = "murthy";
		
		
		//Method 1
		String result = str1.concat(str2).toUpperCase();
		System.out.println(result);
		
		
		// Method 2
		List<String> stringArrays = Arrays.asList(str1, str2);
		String output = stringArrays.stream().collect(Collectors.joining()).toUpperCase();
		System.out.println(output);
		
		// Method 3 
		
		String output1 = Stream.of(str1, str2).collect(Collectors.joining()).toLowerCase();
		System.out.println(output1);
		
		
		
	}

}
 