package com.java.MultiThreadingEnhancements;

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
		
		
		System.out.println("-----------------------------------------------");
		
		
		ThreadGroup tg = new ThreadGroup("tg");
		Thread t1 = new Thread(g1, "Thread1");
		Thread t2 = new Thread(g1, "Thread2");
		g1.setMaxPriority(3);
		Thread t3 = new Thread(g1, "Thread3");
		
		System.out.println(t1.getPriority());
		System.out.println(t2.getPriority());
		System.out.println(t3.getPriority());
	}

}
