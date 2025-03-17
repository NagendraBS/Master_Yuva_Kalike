package com.java.StringBuffer;

public class ReplaceMethod {

	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("Hello");
		
		sb.replace(1, 4, "Yuva");
		
		System.out.println("Replaced String : " + sb);
	}

}
