package com.java.MultiThreading;

class Display{
	
	public static synchronized void wish(String name) {
		
		for(int i = 0; i < 10; i++) {
			
			System.out.print("Good Morning : ");
			
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {

			}
			
			System.out.println(name);
			
		}
	}
}



class MyThread7 extends Thread {
	
	Display d;
	String name;
	
	public MyThread7(Display d, String name) {
		this.d = d;
		this.name = name;
	
	}
	
	public void run() {
		
		d.wish(name);
		
	}
	
	
}



public class SynchronizedDemo {

	public static void main(String[] args) {

		// Normal Case
		
//		Display d = new Display();
//		
//		MyThread7 t1 = new MyThread7(d, "Dhoni");
//		MyThread7 t2 = new MyThread7(d, "Yuvaraj");
//		
//		t1.start();
//		t2.start();
		
		
		//Case 1
		
//		Display d1 = new Display();
//		Display d2 = new Display();
//		
//		MyThread7 t1 = new MyThread7(d1, "Dhoni");
//		MyThread7 t2 = new MyThread7(d2, "Yuvaraj");
//		
//		t1.start();
//		t2.start();
		
		
		// Case 2 :  Making "synchronized" as "static synchronized"
		
		Display d1 = new Display();
		Display d2 = new Display();
		
		MyThread7 t1 = new MyThread7(d1, "Dhoni");
		MyThread7 t2 = new MyThread7(d2, "Yuvaraj");
		
		t1.start();
		t2.start();
		
	}

}
