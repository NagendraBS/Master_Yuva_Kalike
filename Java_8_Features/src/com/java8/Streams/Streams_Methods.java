package com.java8.Streams;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Streams_Methods {

	public static void main(String[] args) {

		ArrayList<Integer> marks = new ArrayList<Integer>();
		
		marks.add(70);
		marks.add(45);
		marks.add(10);
		marks.add(65);
		marks.add(20);
		marks.add(25);
		
		System.out.println(marks);
		
		long noOfFailedStudents = marks.stream().filter(m -> m < 35).count();
		System.out.println("noOfFailedStudents : " + noOfFailedStudents);
		
		
		List<Integer> sortedList = marks.stream().sorted((i1, i2) -> (i1 < i2) ? 1 : (i1 > i2) ? -1 : 0).collect(Collectors.toList());
		System.out.println("sortedList : " + sortedList );
		
	}

}
 