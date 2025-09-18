package com.java.interview;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Employees{
	
	String name;
	int id;
	LocalDate dateOfBirth;
	
	public Employees(String name, int id, LocalDate dateOfBirth) {

		this.name = name;
		this.id= id;
		this.dateOfBirth= dateOfBirth;
	
	}


	public String getName() {
		return name;
	}


	public int getId() {
		return id;
	}


	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	@Override
	public String toString() {
		return "Employee [name=" + name + ", id=" + id + ", dateOfBirth=" + dateOfBirth + "]";
	}
	
	
}




public class EmployeeSorting {

	public static void main(String[] args) {

		List<Employees> emp = new ArrayList<Employees>();
				
				emp.add(new Employees ("Nagendra", 101, LocalDate.of(2000, 04, 28)));
				emp.add(new Employees ("Aditya", 102, LocalDate.of(2000, 07, 18)));
				emp.add(new Employees ("Manoj", 103, LocalDate.of(2000, 04, 17)));
				emp.add(new Employees ("Aditya", 104, LocalDate.of(2000, 10, 04)));
				emp.add(new Employees ("Yuvaraj", 105, LocalDate.of(2000, 11, 28)));
				
				
				//Sorting By Name then date Of Birth	
				emp.sort(Comparator.comparing(Employees::getName).thenComparing(Employees::getDateOfBirth));
				
				//Sorting Average Date Of Birth Of The Employees
//				emp.stream().mapToInt(Employees::getId).average().orElse(0);
				
				
				for(Employees eachEmp : emp ) {
					System.out.println(eachEmp);
				}
		
		
	}


}
