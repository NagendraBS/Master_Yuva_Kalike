package com.java.Operator;

public class UnaryOperators {

	public static void main(String[] args) {

			int x = 5;
			int y = x++;  // Post-increment

			System.out.println("Post-increment");
	        System.out.println("x: " + x);  // After incrementing, x becomes 6
	        System.out.println("y: " + y);  // y gets the old value of x, which is 5
	        
	        
	        int a = 6;
	        int b = ++a;  // Pre-increment

			System.out.println("Pre-increment");
	        System.out.println("a: " + a);  // After incrementing, a becomes 7
	        System.out.println("b: " + b);  // b gets the new value of a, which is 7
	        
	        
	        int p = 7;
	        int q = p--;  // Post-decrement

			System.out.println("Post-decrement");
	        System.out.println("p: " + p);  // After decrementing, p becomes 6
	        System.out.println("q: " + q);  // q gets the old value of p, which is 7
	        
	        
	        int r = 9;
	        int s = --r;  // Pre-decrement

			System.out.println("Pre-decrement");
	        System.out.println("r: " + r);  // After decrementing, r becomes 8
	        System.out.println("s: " + s);  // s gets the new value of r, which is 8
	 

	        
	        
		
	}

}
