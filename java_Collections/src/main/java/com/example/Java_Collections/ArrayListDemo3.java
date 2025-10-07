package com.example.Java_Collections;

import java.util.ArrayList;
import java.util.Arrays;

public class ArrayListDemo3 {

	public static void main(String[] args) {

		 String arr[] = {"Ant", "Bat", "Cat", "Dog", "Elephant"};
		 
		 for (String value : arr) {
			 System.out.println("Elements in the Array are : "  + value);
			 
		 }
		 
		 // Converting Array Into ArrayList
		 
		 
		  ArrayList al = new ArrayList(Arrays.asList(arr)); 
		  
		  System.out.println("After Converting Array to ArrayList");
		  System.out.println(al);
		  
	}

}
