package com.java.StringBuffer;

public class InsertMethod {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("Hello");
		
		sb.insert(2, "Endava");
		
		System.out.println("Inserted in 2nd Index : " + sb);
	}

}
