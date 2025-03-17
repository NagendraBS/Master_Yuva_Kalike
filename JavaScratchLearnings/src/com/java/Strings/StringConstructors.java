package com.java.Strings;

import java.net.MulticastSocket;
import java.nio.charset.Charset;
// Java Program to implement String Constructor

public class StringConstructors {

    // Variables in Methods

	static byte[] b_arr = {89, 117, 118, 97};
	static Charset cs = Charset.defaultCharset();
	static char[] char_arr = {'Y', 'u', 'v', 'a'};
	
	static int[] uni_code = {89, 117, 118, 97};
	static StringBuffer s_buffer = new StringBuffer("Yuva");
	static StringBuilder s_builder =  new StringBuilder("Yuva");
	
	
	public static void main(String[] args) {

        // Method 1
		String s1 = new String(b_arr);
		System.out.println("Method 1 : " + s1);
		System.out.println();
		
		//Method 2 
		String s2 = new String(b_arr, cs);
		System.out.println("Method 2 : " + s2);
		System.out.println();
		
        // This is alternative way for Method 2
		String s22 = new String(b_arr, Charset.forName("US-ASCII"));
		System.out.println("Method 2 Alternative : " + s22);
		System.out.println();
		
		//Method 3
		String s3 = new String(b_arr, 1, 3);
		System.out.println("Method 3 : " + s3);
		System.out.println();
		
		//Method 4
		String s4 = new String(b_arr, 1, 3, cs);
		System.out.println("Method 4 : " + s4);
		System.out.println();
		
        // This is alternative way for Method 4
		String s44 = new String(b_arr, 1, 3, Charset.forName("US-ASCII"));
		System.out.println("Method 4 Alterntive : " + s44);
		System.err.println();
		
		//Method 5
		String s5 = new String(char_arr);
		System.out.println("Method 5 : " + s5 );
		System.out.println();
		
		//Method 6
		String s6 = new String(char_arr, 1, 3);
		System.out.println("Method 6 : " + s6);
		System.err.println();
		
		//Method 7
		String s7 = new String(uni_code, 1, 3);
		System.out.println("Method 7 : " + s7);
		System.out.println();
		
		//Method 8
		String s8 = new String(s_buffer);
		System.out.println("Method 8 : " + s8);
		System.out.println();
		
		//Method 9
		String s9 = s_builder.toString();
		System.out.println("Method 9 : " + s9 );
		System.out.println();

		
	}

}
 