package com.java.ObjectOrientedProgramming;


//Class 1
//Helper class
class Student {
 // Method 1
 public void StudentId(String name, int roll_no)
 {
     System.out.println("Name :" + name + " "
                        + "Roll-No :" + roll_no);
 }

 // Method 2
 public void StudentId(int roll_no, String name)
 {
     // Again printing name and id of person
     System.out.println("Roll-No :" + roll_no + " "
                        + "Name :" + name);
 }
 
}


public class MethdOverloadingOrderParameters {

	public static void main(String[] args) {


		// Creating object of above class
        Student obj = new Student();

        // Passing name and id
        // Note: Reversing order
        obj.StudentId("Yuvaraj", 101);
        obj.StudentId(201, "Nagendra");

	}

}
