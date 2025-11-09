package com.java.Collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.java.Interface_List.Array_List;

class EmployeesFileds{
	
	String name; 
	Integer salary;
	
	
	EmployeesFileds(String name, Integer salary){
		
		this.name = name;
		this.salary = salary;
	}
	
	
	public String getName() {
		return name;
	}


	public Integer getSalary() {
		return salary;
	}



	@Override
	public String toString() {
		return "name" + name + " " + "salary : " + salary;
	}
	
	
}



class SalarySortComparator implements Comparator<EmployeesFileds>{

	@Override
	public int compare(EmployeesFileds emp1, EmployeesFileds emp2) {
		
		int sortSalary = emp1.getSalary().compareTo(emp2.getSalary());
		
		return sortSalary;
	}
	
	
	
}


public class Employee {

	public static void main(String[] args) {

		List<EmployeesFileds> empList = new ArrayList<>();
		
		empList.add(new EmployeesFileds("Nagendra", 4000)); 
		empList.add(new EmployeesFileds("abhi", 8000)); 
		empList.add(new EmployeesFileds("Yuvaraj", 5000)); 
		empList.add(new EmployeesFileds("Manoj", 6000)); 
		empList.add(new EmployeesFileds("yathish", 9000)); 
		
//		for(EmployeesFileds empSalryBeforeSorting : empList) {
//			
//			System.out.println(empSalryBeforeSorting);
//		}
		
		
//		Collections.sort(empList, new SalarySortComparator());
//		Collections.sort(empList, Collections.reverseOrder());
		
		empList.stream().sorted(Comparator.comparing(EmployeesFileds::getSalary, Comparator.reverseOrder())).collect(Collectors.toList())
		.forEach(e -> System.out.println(e));
		
		
		System.out.println(" ");
		
		
//		for(EmployeesFileds empSalryAfterSorting : empList) {
//			
//			System.out.println(empSalryAfterSorting);
//		}
		
	}

}
