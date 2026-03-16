package com.java.MultiThreading;

public class MultiThreading_Enhancement {

	public static void main(String[] args) {

		System.out.println(Thread.currentThread().getThreadGroup().getName());
		// OP : Main
		
		System.out.println(Thread.currentThread().getThreadGroup().getParent().getName());
		//  OP : System
		
		ThreadGroup g1 = new ThreadGroup("First Group");
		System.out.println(g1.getParent().getName());
		// OP : Main
		
		ThreadGroup g2 = new ThreadGroup(g1, "Second Group");
		System.out.println(g2.getParent().getName());
		// Op: First Group
		
		
	}

}
