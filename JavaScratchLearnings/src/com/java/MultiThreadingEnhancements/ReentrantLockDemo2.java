package com.java.MultiThreadingEnhancements;

import com.java.MultiThreadingEnhancements.Display;
import com.java.MultiThreadingEnhancements.MyThread;

import java.util.concurrent.locks.*;

public class ReentrantLockDemo2 {

	public static void main(String[] args) {

		Display d = new Display();

		MyThread t1 = new MyThread(d, "Dhoni");
		MyThread t2 = new MyThread(d, "Yuvaraj");
		MyThread t3 = new MyThread(d, "Sachin");

		t1.start();
		t2.start();
		t3.start();

	}

}

// Implementing the lock Instead of using the "synchronized" keyword

class Display {

	ReentrantLock l = new ReentrantLock();

	
	public void wish(String name) {

		l.lock();  // Locking the Thread
		
		for(int i = 0; i < 10 ; i++) {
			
			System.out.println("Good Morning : ");
			
			try {
				Thread.sleep(2000);
			}
			catch (InterruptedException e) {
			}
			
			System.out.println(name);
		}
		
		l.unlock();  // unlocking the thread
		

		}

	}



class MyThread extends Thread {

	Display d;
	String name;

	public MyThread(Display d, String name) {
		this.d = d;
		this.name = name;

	}

	public void run() {

		d.wish(name);

	}

}
