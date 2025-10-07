package com.java.ArrayClassMethods;

import java.util.Arrays;

public class Compare {

	public static void main(String[] args) {

		//Get First Array
		int[] arrFirst = {10, 30, 45, 22, 87, 65};
		
		//Get Second Array
		int[] arrSecond = {10, 22, 65};
		
		//To Compare both Arrays
		System.out.println("Integer Arrays on Comparison : " + Arrays.compare(arrFirst, arrSecond));		
		
	}

}
