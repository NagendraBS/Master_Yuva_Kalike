package com.java8.Streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class UpperCase_Streams_Exmp {

	public static void main(String[] args) {

		// Sample Collecction (List of Strings)
		List<String> names = Arrays.asList("Nagendra", "naresh", "Jessica", "Indira", "SriRaksha", "Neha", "Srinivasa");

		List<String> fileteredNames = names.stream()
											.filter(name -> name.toLowerCase().startsWith("s"))  // Case Sensitive Checks
											.map(String::toUpperCase)
											.collect(Collectors.toList());

		System.out.println("fileteredNames : " + fileteredNames );

	}

}
