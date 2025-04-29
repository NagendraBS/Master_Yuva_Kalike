package com.java8.Predicate;

import java.util.function.Predicate;

// If We Have To Test Some boolean Conditions Then We Can go For the "Predicate" Functional Interface

public class PredicateDemo {

	public static void main(String[] args) {

	//	Case 1
//		Predicate<Integer> p = i ->  i>10;    // Using Lambda Expression and Functional Interface reference as "p".
		
	// Case 2
//		Predicate<Integer> pr = i -> i%2 == 0 ;   //  To Check Weather the Provided Integer is Even Or Not
		
	// Case 3  : To Check the String Starts with the Same Letter
		
		String[] str = { "Neha", "Nagendra", "Nikhil", "Adhishesha", "Vasuki" };
		
		 Predicate<String> ps =  str1 -> str1.charAt(0)=='N';
		System.out.println("The Strings Starts with 'N' are :");
		
		for(String s1 : str) {
			if(ps.test(s1)) {
				System.out.println(s1);
			}	
		}
		
		
		
		
	//	case 1
//		System.out.println(p.test(100));
//		System.out.println(p.test(9));
		
		
//		case 2
//		System.out.println(pr.test(32));
//		System.out.println(pr.test(31));

		
	}

}
 