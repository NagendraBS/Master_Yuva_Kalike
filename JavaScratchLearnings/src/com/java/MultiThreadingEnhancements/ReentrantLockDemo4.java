package com.java.MultiThreadingEnhancements;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.*;

public class ReentrantLockDemo4 {

	public static void main(String[] args) {

		MyThread2 t1 = new MyThread2("First Thread");
		MyThread2 t2 = new MyThread2("Second Thread");
		t1.start();
		t2.start();

	}

}

class MyThread2 extends Thread {

	static ReentrantLock l = new ReentrantLock();

	public MyThread2(String name) {

		super(name);

	}

	public void run() {

		do {

			try {

				if(l.tryLock(5000, TimeUnit.MILLISECONDS)) {

					System.out.println(Thread.currentThread().getName() + "....Got Lock");
					Thread.sleep(30000);
					l.unlock();

					System.out.println(Thread.currentThread().getName() + "....Releases Lock");
					break;

				} else {
					System.out.println(Thread.currentThread().getName() + "....Unable to Get Lock will try again");
				}

			} catch (Exception e) {
				
			}
			
		} 
		
		while (true);

	}

}
