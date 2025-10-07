package com.java.Exceptions_Top10;


//Stack OverFlow Error Since Recursively Calling the Methods m1() and m2() Back to Back...
// Due to Recursive Calling  Runtime Stack get overFlow and Will Get STACKOVERFLOW Error
public class StackOverFlowErrorDemo {

	public static void m1() {
		m2();
	}
	
	public static void m2() {
		m1();
	}
	
	public static void main(String[] args) {
		
		m1();

	}

}
