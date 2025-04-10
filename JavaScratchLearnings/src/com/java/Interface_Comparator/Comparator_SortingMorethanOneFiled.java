package com.java.Interface_Comparator;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.java.Interface_List.Array_List;

//Define the Student class
class Students 
{
 String name;
 Integer age;

	// Constructor
 Students(Integer age, String name) {
     this.name = name;
     this.age = age;
 }

 public String getName() {
     return name;
 }

 public Integer getAge() {
     return age;
 }

	// Method to print student
	// details in main()
 @Override
 public String toString() {
     return name + " : " + age;
 }
}

//Comparator in a Helper Class
class CustomerSortingComparator 
		implements Comparator<Students> 
{
 
	// Compare first by name, then by age
 public int compare(Students customer1, Students customer2) {
     
   	// Compare by name first
     int NameCompare = customer1.getName().compareTo(
       						customer2.getName());
     
     // If names are the same, compare by age
     int AgeCompare = customer1.getAge().compareTo(
       						customer2.getAge());
     
     // Return the result: first by name, second by age
     return (NameCompare == 0) ? AgeCompare : NameCompare;
 }
}

public class Comparator_SortingMorethanOneFiled {

	public static void main(String[] args) {

		List<Students> list = new ArrayList<>();

		list.add(new Students(25, "Nagendra"));
		list.add(new Students(26, "Mayur"));
		list.add(new Students(26, "Venkat"));
		list.add(new Students(24, "Dhanush"));
		list.add(new Students(21, "Yogesh"));

		System.out.println("Original List: ");

		// Iterating List
		for (Students st : list) {
			System.out.println(st);
		}

		System.out.println();

		// Sort students by Name, then by Age
		// using the CustomerSortingComparator
		Collections.sort(list, new CustomerSortingComparator());

		// Display message only
        System.out.println("After Sorting ");

        // Iterating using enhanced for-loop
        // after Sorting ArrayList
        for (Students it : list) {
            System.out.println(it);
        }
		
	}

}
