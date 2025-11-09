package com.java.interview;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class NameByLetterANDUpperCase {

	public static void main(String[] args) {

		List<String> names = Arrays.asList("Nagendra", "nagarjuna", "Hithesh", "Amar", "NAGESH");
		
		List<String> fileterdNames = names.stream()
		.filter(name -> name.startsWith("N"))
		.map(name -> name.toUpperCase())
		.collect(Collectors.toList());
		
		System.out.println(fileterdNames);
		
	}

}
