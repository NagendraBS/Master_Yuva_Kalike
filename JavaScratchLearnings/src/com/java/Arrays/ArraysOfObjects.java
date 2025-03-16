package com.java.Arrays;

 class Student{
	
	 public int roll_no;
	 public String name;
	 
	 Student(int roll_no, String name){
		 
		 this.roll_no = roll_no;
		 this.name = name;
	 }
	 
}
	
public class ArraysOfObjects {

	public static void main(String[] args) {

        // declares an Array of Student
		Student stArr[];
		
		//Allocating Memory to the Array
		 stArr = new Student[5];
		 
		 // initiating the elements of the array
		 stArr[0] = new Student(101, "Abhi");
		 stArr[1] = new Student(102, "Bhavan");
		 stArr[2] = new Student(103, "Chida");
		 stArr[3] = new Student(104, "Dhanush");
		 stArr[4] = new Student(105, "Elen");
		 
	    //accessing the elements of the specified array
		 for(int i = 0 ; i < stArr.length; i++) {
			 System.out.println("Element at " + i + " is : " + "{ " + stArr[i].roll_no + ", " + stArr[i].name + " }");
		 }
		 
	}

}
