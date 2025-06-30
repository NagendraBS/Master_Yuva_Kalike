package com.java.interview;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


class StudentComparatorDate implements Comparator<Student>{

	@Override
	public int compare(Student o1, Student o2) {
		
		int dateOfjoiningComparision = o1.dateOfJoining.compareTo(o2.dateOfJoining);
		
		return dateOfjoiningComparision ;
	}
	
	
}


class StudentComparatorName implements Comparator<Student>{

	@Override
	public int compare(Student o1, Student o2) {

		int nameComparision = o1.studentName.compareTo(o2.studentName);
		
		return nameComparision ;
	}
	
	
}

public class Test1a {

	public static void main(String[] args) {

		List<Student> studentList = Arrays.asList(
				
				new Student("Nagendra", 25, LocalDate.of(2025, 06, 11)),
				new Student("Yuvaraj", 23, LocalDate.of(2025, 06, 14)),
				new Student("Abhi", 22, LocalDate.of(2025, 06, 12)),
				new Student("Geetha", 26, LocalDate.of(2025, 06, 17)),
				new Student("Prakash", 22, LocalDate.of(2025, 06, 19))
				
				);
				
		
		
//		List<Object> objectList = Arrays.asList(1, "Nag", 4, new Test1a());
//		
//		objectList.stream()
//		.filter(obj ->  !(obj instanceof Integer))
		
//		.forEach(System.out::println);
		
		
		Collections.sort(studentList, new StudentComparatorName());
		System.out.println(" Students List Sorted By Name : " + studentList);
		
		
		Collections.sort(studentList, new StudentComparatorDate());
		System.out.println(" Students List Sorted By Date : " + studentList);
		
	}

}
