package com.java.StringBuffer.Methods;

public class DeleteMethod {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("GeeksforGeeks");
		
		sb.delete(2, 5);
		
		System.out.println(sb);
		
		sb.deleteCharAt(9);
		System.out.println(sb);
		
		
	}

}
