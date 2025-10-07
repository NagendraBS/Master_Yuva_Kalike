package com.java.Interface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

// To sort a given List, ComparatorClass must implement a Comparator interface.

class Student{
	
	int rollNo;
	String name;
	
	Student(int rollNo, String name){
		this.rollNo = rollNo;
		this.name = name;
	}
	
	@Override
	public String toString() {
		
		return rollNo  + " : " + name;
	}
	
}


//Helper class implementing Comparator interface
class SortbyRollNo implements Comparator<Student>{

    // Compare by roll number in ascending order
	
	@Override
	public int compare(Student a, Student b) {
		
		return a.rollNo - b.rollNo ;
	}
	
}



public class Comparator_Interface {

	public static void main(String[] args) {

		List<Student> student = new ArrayList<Student>();
		
		student.add(new Student (111, "Mahesh"));
		student.add(new Student (131, "Abhi"));
		student.add(new Student (121, "Sumanth"));
		student.add(new Student (101, "Alok"));
		
		// Sort students by roll number
        // using SortbyRoll comparator
		
		Collections.sort(student, new SortbyRollNo());
		
        System.out.println("Sorted by Roll Number ");

        for(int i=0; i < student.size(); i++)
        	System.out.println(student.get(i));
		
	}

}
