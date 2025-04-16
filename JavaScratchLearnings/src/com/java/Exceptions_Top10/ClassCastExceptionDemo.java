package com.java.Exceptions_Top10;

public class ClassCastExceptionDemo {

	public static void main(String[] args) {
		
		// Type Casting Child to Parent Object is Possible.
		
		String s = new String ("Yuvaraj");
		Object o = (Object) s;
		
		System.out.println(o);
		
		
		
		// Type Casting Parent Object to Child Object Will Results in Class Cast Exception
		
		Object o1 = new Object();
		String s1 = (String) o1;
		
		System.out.println(s1);
		
		
		
//		CASE  // Comment Above Code and try
		
		Object o2 = new String("Nagendra");
		String s2 = (String) o2;
		
		
		System.out.println(s2);
		
		
	}
	
} 