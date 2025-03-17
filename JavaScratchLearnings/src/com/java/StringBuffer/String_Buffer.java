package com.java.StringBuffer;

import java.lang.*;

public class String_Buffer {

	public static void main(String[] args) {

		//Creating String Buffer
		StringBuffer sb = new StringBuffer();
		
        // Adding elements in StringBuffer
		sb.append("Hello");
		sb.append( " ");
		sb.append("Nagendra");
		
        // String with the StringBuffer value
		 String str = sb.toString();
		 System.out.println(str);
		
		
		
		
	}



}
