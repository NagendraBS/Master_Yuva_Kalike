package com.java.MultiThreading;

class MyThreadDemo extends Thread{
	
	public void run() {
		System.out.println("No - Argument Run");
	}
	
	public void run(int i ) {
		System.out.println("int - Argument Run");
	}
	
}


public class OverLoadingOfRun {

	public static void main(String[] args) {

		MyThreadDemo t = new MyThreadDemo();
		
		t.start();  //  output : No - Argument Run
		
		t.run();  //  output : No - Argument Run
		
		t.run(5);  // output : int - Argument Run, Simce We passed the Argument mentioned in the run(int i) Method.
		
	}

}
