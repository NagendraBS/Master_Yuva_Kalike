package com.java8.Streams;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class DuplicatesFinderUsingStreams {

	public static void main(String[] args) {

        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Alice", "Bob", "David");

        Set<String> seen = new HashSet<>();
        Set<String> duplicates = new HashSet<>();

        for(String name : names) {

        	if(!seen.add(name)) {
        		duplicates.add(name);
        	}

        }

        List<String> duplicateNames = new LinkedList<>(duplicates);

        System.out.println("Duplicates Elements are : " + duplicateNames);

	}

}
