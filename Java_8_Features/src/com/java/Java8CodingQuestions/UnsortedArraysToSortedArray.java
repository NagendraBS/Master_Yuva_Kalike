package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.stream.IntStream;

public class UnsortedArraysToSortedArray {

	public static void main(String[] args) {

		int [] a = new int[] {4,2,7,5,1};
		
		int [] b = new int[] {8,3,9,5};
		
		int [] c = IntStream.concat(Arrays.stream(a), Arrays.stream(b)).sorted().distinct().toArray();
		
		System.out.println(Arrays.toString(c));
	}

}
