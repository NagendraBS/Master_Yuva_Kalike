package com.java.MultiThreading;

class ThreadB extends Thread {

	int total = 0;

	public void run() {

		synchronized (this) {

			System.out.println("Child Thread Starts Calculation !"); // 2

			for (int i = 1; i <= 100; i++) {
				total = total + i;
			}

			System.out.println("Child Thread giving Notification"); // 3

			this.notify();

		}

	}

}

public class ThreadWaitNotify {

	public static void main(String[] args) throws InterruptedException {

		ThreadB b = new ThreadB();

		b.start();
//		Thread.sleep(5000);     // If We Uncomment This, Main Thread Will Enter Into the Sleeping State.
		synchronized (b) {

			System.out.println("Main Thread Calling Wait() Method"); // 1

			b.wait();
			b.wait(5000); // UnComment If You Are Using "Thread.sleep(5000)". So, that Main Thread Will
							// Wait Only for 5 Seconds. Later it Will Executes its Flow

			System.out.println("Main Thread got notification"); // 4

			System.out.println(b.total); // 5

		}

	}

}
