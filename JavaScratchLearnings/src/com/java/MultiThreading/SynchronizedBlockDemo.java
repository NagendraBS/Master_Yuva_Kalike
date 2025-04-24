package com.java.MultiThreading;

class Displays {
	public void wish(String name) {

		synchronized (this) {               //  Synchronizing to Few Lines Of Code

			for (int i = 0; i < 10; i++) {

				System.out.print("Good Morning  : ");

				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {

				}

				System.out.println(name);

			}

		}

	}

}


class MyThread8 extends Thread{
	
	Displays d;
	String name;
	
	public MyThread8(Displays d, String name) {

		this.d = d;
		this.name = name;
		
	}
	
	 public void run() {
		 d.wish(name);
	 }
	
	
}


public class SynchronizedBlockDemo {

	public static void main(String[] args) {

		Displays d = new Displays();
		
		MyThread8 t1 = new MyThread8(d, "Dhoni");
		MyThread8 t2 = new MyThread8(d, "Yuvaraj");
		
		t1.start();
		t2.start();
		
	}

}
