package com.java.MultiThreading;

//If We uncommented this  "Thread.yield()"  Line Means, MainThread Get the Chance to  Execution.

class MyThreadYield extends Thread{
	public void run() {
		for(int i=0; i < 10; i++) {
			System.out.println("Child Thread");
			Thread.yield();
		}
		
	}
}


public class ThreadYieldDemo {

	public static void main(String[] args) {

		MyThreadYield t = new MyThreadYield();
		
		t.start();
		
		for(int i = 0; i<10 ; i++) {
			System.out.println("Main Thread");
		}
	}

}
