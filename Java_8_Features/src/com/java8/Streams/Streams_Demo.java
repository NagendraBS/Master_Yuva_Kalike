package com.java8.Streams;

import java.awt.print.PrinterGraphics;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.stream.Collectors;

public class Streams_Demo {

	public static void main(String[] args) {
		
		ArrayList<Integer> marks = new ArrayList<>();
		 
		marks.add(0);
		marks.add(5);
		marks.add(10);
		marks.add(15);
		marks.add(20);
		marks.add(25);
		
		System.out.println(marks);
		
		List<Integer> evenMarks = marks.stream().filter(i -> i%2 == 0).collect(Collectors.toList());
		
		List<Integer> updatedMarks = marks.stream().map(i -> i+5).collect(Collectors.toList());
		
		System.out.println("Even Marks From the Markslist Are : " + evenMarks);
		
		System.err.println("Added +5 as Grace Marks : " + updatedMarks);
		
		
		//Map
		
		List<Integer> list1 = Arrays.asList(1,2,3,4,5,6);
		
		List<Integer> list2 = list1.stream().map(n -> n + 10).collect(Collectors.toList());
		
		System.out.println( "MAP Output : "  + list2);
		
		
		// Flat Map :  flatMap() is a stream operation in Java 8+ 
		// that flattens nested structures (like lists inside lists) and then maps each element.
		
		List<Integer> lst1 = Arrays.asList(1,2);
		List<Integer> lst2 = Arrays.asList(3,4);
		List<Integer> lst3 = Arrays.asList(5,6);
		
		List< List<Integer>> finalList = Arrays.asList(lst1, lst2, lst3);
		
		System.out.println(finalList);
		
//		List<Integer> finalMainList =  finalList.stream().flatMap(x -> x.stream()).collect(Collectors.toList());
		
		List<Integer> finalMainList =  finalList.stream().flatMap(x -> x.stream()).map(n -> n + 1).collect(Collectors.toList());
		
		System.out.println(finalMainList);
		
		
		
				
		
		
	
	}
}