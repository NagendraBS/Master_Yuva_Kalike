package com.java.Interface_Comparator;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Student {

	int rollNo;
	String name;

	Student(int rollNo, String name) {
		this.rollNo = rollNo;
		this.name = name;
	}

	@Override
	public String toString() {
		return "Student [rollNo=" + rollNo + ", name=" + name + "]";
	}

}

//Helper class implementing Comparator interface
class SortbyRoll implements Comparator<Student> {

	@Override
	public int compare(Student a, Student b) {
		return a.rollNo - b.rollNo;
	}

}


//By changing the return value inside the compare method, you can sort in any order that you wish to, for example: For descending order just change the positions of ‘a’ and ‘b’ in the above compare method.

public class ComparatorDemo_Student {

	public static void main(String[] args) {

		// List of Students
		List<Student> students = new ArrayList<Student>();

		// Add Elements in List
		students.add(new Student(101, "Bharath"));
		students.add(new Student(103, "Charli"));
		students.add(new Student(105, "John"));
		students.add(new Student(102, "Chaya"));
		students.add(new Student(104, "Gagan"));

		System.out.println(students);

		// Sort students by roll number using SortbyRoll comparator

		Collections.sort(students, new SortbyRoll());

		System.out.println("Sorted by Roll Number ");

		// Iterating over entries to print them
		for (int i = 0; i < students.size(); i++) {
			System.out.println(students.get(i));
		}

	}

}
