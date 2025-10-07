package com.java.StringBuffer;

public class CapacityMethod {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer();
		
		System.out.println(sb.capacity());  // 16
		sb.append("Java");
		
		System.out.println(sb.capacity());  // 16
		sb.append(" Language is Easy to Learn");
		
		System.out.println(sb + " : " + sb.capacity());  // 34
		
	}

}
