package com.java.MultiThreading;

class MyThreadJoin extends Thread{
	
	public void run() {
		
		for(int i = 0; i< 10; i++) {
			System.out.println("Seetha Thread");
			
			try {
				Thread.sleep(2000);
			} catch (Exception e) {

			}
	
		}
	}
	
}


public class ThreadJoinDemo {

	public static void main(String[] args) throws InterruptedException {
 
		MyThreadJoin t = new MyThreadJoin();
		
		t.start();
		
//		t.join();
//		t.join(5000); 
		t.join(5000, 999);
		
		// Here RamaThread will wait until the Seetha Thread Will get Completes, 
		//Once Seeta Thread Completes Ram Thread Will Excecute its Excecution.
		
		for(int i=0; i < 10; i++) {
			System.out.println("Rama Thread");
		}
		
	}

}
