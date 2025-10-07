package com.java.MultiThreading;


class MyThreads extends Thread{
	
	public void run(){
		for(int i = 0; i < 10; i++) {
			System.out.println("Child Thread");
		}
		
	}
	
}

public class ThreadPrioritiesDemo {

	public static void main(String[] args) {

		MyThreads t = new MyThreads();
		
		t.setPriority(10);   // Some Platfomrs Won't Provide proper Support for Thread Priorities.
		
		t.start();
		
		for(int k = 0 ; k < 10; k++) {
			System.out.println("Main Thread");
		}
		
		
	}

}
