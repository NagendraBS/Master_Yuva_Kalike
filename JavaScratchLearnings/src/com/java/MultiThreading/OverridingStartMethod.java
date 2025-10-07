package com.java.MultiThreading;

// Not Recpommended to Override start()

class MythreadDemo2 extends Thread{
	
	public void start() {
		super.start();
		System.out.println("Start Method");
	}
	
	public void run() {
		System.out.println("Run Method");
	}
	
}


//If we Override the Start (), our start() method will be executed like Normal Method Call
public class OverridingStartMethod {

	public static void main(String[] args) {

		MythreadDemo2 t = new MythreadDemo2();
		t.start();
		System.out.println("Main Method");
		
	}

}
