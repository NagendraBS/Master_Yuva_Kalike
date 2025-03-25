package com.java.Interface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Students {

	Integer age;
	String name;

	Students(Integer age, String name) {
		this.age = age;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public Integer getAge() {
		return age;
	}

	@Override
	public String toString() {
		return name + " : " + age;
	}

}

// Comparator in a Helper Class
class CustomerSortingComparator implements Comparator<Students> {

	// Compare first by name, then by age

	@Override
	public int compare(Students customer1, Students customer2) {

		// Compare First by Name
		int NameCompare = customer1.getName().compareTo(customer2.getName());

		// Compare First by Age
		int AgeCompare = customer1.getAge().compareTo(customer2.getAge());

		// Return the result: first by name, second by age
		return (NameCompare == 0) ? AgeCompare : NameCompare;
//		return (AgeCompare == 0) ? NameCompare : AgeCompare;

	}

}

public class Comparator_moreThanOneFiled {

	public static void main(String[] args) {

		List<Students> students = new ArrayList<Students>();

		students.add(new Students(27, "Ajay"));
		students.add(new Students(23, "Sneha"));
		students.add(new Students(37, "Simran"));
		students.add(new Students(22, "Ankit"));
		students.add(new Students(29, "Anshul"));
		students.add(new Students(22, "Sneha"));

		System.out.println("Original List");

		// Iterating List
		for (Students st : students) {
			System.out.println(st);
		}

		System.out.println();

		// Sort students by name, then by age using the CustomerSortingComparato

		Collections.sort(students, new CustomerSortingComparator());

		// Display message only
		System.out.println("After Sorting ");

		// Iterating List
		for (Students st1 : students) {
			System.out.println(st1);
		}

	}

}
