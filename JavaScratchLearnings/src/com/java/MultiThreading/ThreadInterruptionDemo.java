package com.java.MultiThreading;

class MyThread6 extends Thread{

	public void run() {
		
		try {
			
			for(int i = 0 ; i < 10; i++) {
				System.out.println("I am a Lazy thread");
				Thread.sleep(2000);
			}
		} catch (InterruptedException e) {
			System.out.println("I Got Interrupted");
			
		}
		
	}
}


public class ThreadInterruptionDemo {

	public static void main(String[] args) {

		MyThread6 t = new MyThread6();
		
		t.start();
		
		t.interrupt();
		
		System.out.println("End of Main Thread");
	}

}
