package com.java.MultiThreadingEnhancements;

import java.util.concurrent.locks.*;

public class ReentrantLockDemo3 {

	public static void main(String[] args) {

		MyThread1 t1 = new MyThread1("First Thread");
		MyThread1 t2 = new MyThread1("Second Thread");
		t1.start();
		t2.start();

	}

}

class MyThread1 extends Thread {

static	ReentrantLock l = new ReentrantLock();

	public MyThread1(String name) {

		super(name);

	}

	public void run() {

		if(l.tryLock()) {

			System.out.println(Thread.currentThread().getName() + "....Got Lock and performing safe operations");

			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {

			}

			l.unlock();

			} else {
					System.out.println(Thread.currentThread().getName()
					+ ".... Unable to get Lock and hence performing alternative operations");
		}
	}

}
