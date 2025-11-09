package com.java.Exceptions_Top10;

public class Array_IndexOutOfBoundException {

	public static void main(String[] args) {

		int[] a = new int[10];

		System.out.println(a[0]);
		System.out.println(a[9]);

		System.out.println(a[10]);
//		System.out.println(a[-11]);

	}

}
