package com.java.streams;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Emp{
	
	private String name;
	private String department;
	private int salary;
	
	Emp(String name, String department, int salary){
		
		this.name= name;
		this.department= department;
		this.salary=salary;
	}

	public String getName() {
		return name;
	}



	public String getDepartment() {
		return department;
	}



	public int getSalary() {
		return salary;
	}

	
	@Override
	public String toString() {
		return "Emp [name=" + name + ", department=" + department + ", salary=" + salary + "]";
	}

	
}

public class EmployeesDiffOperations {
	public static void main(String[] args) {

		List<Emp> employees = Arrays.asList(
				new Emp("Alice", "HR", 3000),
			    new Emp("Bob", "IT", 4000),
			    new Emp("Charlie", "HR", 3500),
			    new Emp("David", "IT", 4500),
			    new Emp("Eve", "Sales", 3800),
			    new Emp("Robin", "Sales", 4200)
			    );
		
		
		//Group employees by department
		//Count how many employees are in each department
		//Return the result as a Map<String, Long>
		
		Map<String, Long> listOfEmpOnDepts = employees.stream().collect(Collectors.groupingBy(Emp::getDepartment, Collectors.counting()));
		System.out.println(listOfEmpOnDepts);
		
		
		//Filter only "IT" department employees
		//Sum their salaries
		//Print the total salary
		
		List<Integer> itSalary = employees.stream().filter(e -> e.getDepartment().contains("IT")).map(Emp::getSalary).collect(Collectors.toList());
		
		System.out.println(itSalary);
		
		int total = 0;
		
		for(int salary : itSalary) {
			
			total = total + salary;
		}
		
	
		System.out.println("Total IT Department Salary : " + total);
		
		
		//Group employees by department and calculate the total salary paid per department
		// You’ll return: Map<String, Integer>
		//Where key = department name, value = total salary for that department.
		
		Map<String, Integer> totalSalary = getTotalsalarybyDepartment(employees);
		System.out.println("TotalsalarybyDepartments : " + totalSalary);
		
		
	}
	
	
	public static Map<String, Integer> getTotalsalarybyDepartment(List<Emp> employees){
		
		Map<String, Integer> totalSalarybyDept = employees.stream().
				collect(Collectors.groupingBy(Emp::getDepartment, Collectors.summingInt(Emp::getSalary)));
		
		return totalSalarybyDept ;
		
	}
	
	
}
