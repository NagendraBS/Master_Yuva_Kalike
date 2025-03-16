package com.java.Arrays;

class Student1 {
	String name;
	
	Student1(String name){
		this.name = name;
	}
	
	//Generated toString () by java
	
//	@Override
//	public String toString() {
//		return "Student1 [name=" + name + "]";
//	}
	
	
	@Override
	public String toString() {
		return name;
	}
}

public class ArraysOfObjects1 {

	public static void main(String[] args) {

		// declares an Array and initializing the elements of the array
		Student1[] arr = new Student1[] {new Student1("Srinivasa"), new Student1("Kalavathi"), new Student1("Nagendra")};
		
		//Accessing array elements of the specified array
		for(Student1 arrItr : arr) {
			System.out.println(arrItr);
		}
		
		
	}

}
