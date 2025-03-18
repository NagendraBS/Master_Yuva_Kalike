package com.java.StringBuffer.Methods;

public class ReplaceMethod1 {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("GeeksforGeeks");
		
		sb.replace(5, 8, "are");
		
		System.out.println(sb);
		
	}

}
