package com.java.MultiThreading;

class MyThread5 extends Thread {

	static Thread mt; // Creating an Thread Reference called "mt" to hold the Main Thread

	public void run() {

		try {

			mt.join();  // Calling join() method Using The Main Thread Object.

		} catch (InterruptedException e) {
			
		}

		for (int i = 0; i < 10; i++) {
			System.out.println("Child Thread");
		}

	}

}

public class ThreadJoinDemo_ChildthreadWaiting {

	public static void main(String[] args) {

		MyThread5.mt = Thread.currentThread(); // Assigning the Current Thread (Main Thread) to "mt" Referenec

		MyThread5 t = new MyThread5();

		t.start();

		for (int i = 0; i < 10; i++) {
			System.out.println("Main Thread");
		}

	}

}
