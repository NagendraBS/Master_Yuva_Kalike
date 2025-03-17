package com.java.StringBuffer;

public class DeleteMethod {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("Hello");
		
		System.out.println(sb );
		sb.delete(2, 4);
		System.out.println(sb);
		
	}

}
