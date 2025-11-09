package com.java.Interface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.java.Interface_List.Array_List;

class Employee{
	
	String name; 
	Integer salary;

  Employee(String name, Integer salary) {

		this.name = name ;
		this.salary= salary;
	}
	
	public String getName() {
		return name;
	}
	
	public int getSalary() {
		return salary;
	}
	
	public void setName(String name) {
		this.name  =name;
	}
	
	public void setSalary(Integer salary) {
		this.salary = salary;
	}
	
	public String toString() {
		return "name : " + name +  " " +"Salary :" + salary;
	}
	
}


class EmployeeSorting implements Comparator<Employee>{

	@Override
	public int compare(Employee emp1, Employee emp2) {

//		return  emp1.getSalary() - emp2.getSalary();

		int nameCompare = emp1.getName().compareTo(emp2.getName());
	
		return nameCompare;
	}
		
}



public class ComparatorInterface_ExampleEmployee {

	public static void main(String[] args) {

		List<Employee> empList = new ArrayList<>();
		
		empList.add( new Employee("Nagendra",50000));
		empList.add( new Employee("Yuvaraj",60000));
		empList.add( new Employee("Sharan",36000));
		empList.add( new Employee("Varun",78000));
		empList.add( new Employee("Abhi",44000));
		
		for(Employee empBeforeSort : empList) {
			System.out.println(empBeforeSort);
			
		}
		
		Collections.sort(empList, new EmployeeSorting());
		
		
		System.out.println();
		
		for(Employee empAfterSort : empList) {
			System.out.println(empAfterSort);
		}
		
		
	}

	
	
}
