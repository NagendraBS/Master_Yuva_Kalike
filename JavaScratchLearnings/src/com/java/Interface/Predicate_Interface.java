package com.java.Interface;

import java.util.*;
import java.util.List;
import java.util.function.Predicate;


public class Predicate_Interface {

	public static void main(String[] args) {

        // create a list of strings
		List<String> listStrings = Arrays.asList("Geeks", "GeekQuiz", "QA", "g1", "Geek4");
		
		// declare the predicate type as string and use lambda expression to create object
		Predicate<String> p = (s) -> s.startsWith("G");
		
		//Iterate the list of Strings
		for(String st : listStrings) {
			
			//Call the Test Method
			if(p.test(st)) {
				System.out.println(st);
			}
		}
		
		
		
	}

}
