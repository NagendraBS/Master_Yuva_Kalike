package com.java.ArrayClassMethods;

import java.util.Arrays;

public class CompareUnsigned {

	public static void main(String[] args) {

		int[] arrFirst = {10, 20, 15, 22, 35};
		
		int[] arrSecond = { 10, 15, 22};
		
		System.out.println(" Integer Arrays on Comparision : " + Arrays.compareUnsigned(arrFirst, arrSecond));
		
	}

}
