package com.java.numbers;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

public class LargestThreedistinctElementsInAnarray {

	public static void main(String[] args) {

		int [] arr = {12, 10, 9, 45, 2, 10, 10, 45};
		
		if(arr.length < 3) {
			System.out.println("Array has Less Than 3 Elements");
			return;
		}

		int first = Integer.MIN_VALUE;
		int second = Integer.MIN_VALUE;
		int third = Integer.MIN_VALUE;
		
		System.out.println( "first : " + first);
		System.out.println("second : "+second);
		System.out.println("third : " +third);
		
		for(int num : arr) {
			
			if(num > first) {
				
				third = second;
				second = first;
				first = num;
				
			}
			else if(num > second && num != first) {
				third =second;
				second = num;
				
			}
			else if(num > third && num != second && num != first ) {
				third = num;
			}
				
		}
		
		System.out.println( "first : " + first);
		System.out.println("second : "+second);
		System.out.println("third : " +third);
		
	}

}
