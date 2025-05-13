package com.java8.Function;

import java.util.function.Function;

public class Function_Demo {

//	Functions are exactly same as predicates except that functions can return any type of result
//			but function should (can) return only one value and that value can be any type as per our
//			requirement.
//			 To implement functions oracle people introduced Function interface in 1.8version.
//			 Function interface present in Java.util.function package.
//			 Functional interface contains only one method i.e., apply()
//	
	
	public static void main(String[] args) {

		Function<String, Integer> f = s -> s.length();
		System.out.println(f.apply("Nagendra"));
				
		
	}

}
