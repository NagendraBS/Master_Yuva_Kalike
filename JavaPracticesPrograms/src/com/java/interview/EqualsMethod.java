package com.java.interview;

public class EqualsMethod {

	public static void main(String[] args) {

		String str1 = "Nagendra";
		String str3 = "Nagendra";

		String str2 = new String("Nagendra");
		
		System.out.println(str1==str2);
		
		System.out.println(str1.equals(str2));
		
		System.out.println(str1==str3);
		
	}

}
