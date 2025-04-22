package com.java.MultiThreading;

// A Separate Flow of Exceution is Called as Thread.


// Defining a Thread
class MyThread extends Thread{
	
	@Override
	public void run() {
		
		//Job a Thread
		
		for(int i = 0; i < 10 ; i++){
			System.out.println("Child Thread");
		}
		
	}
	
}


public class MultiThreadingDemo {

	public static void main(String[] args) {

		MyThread thread = new MyThread();
		
		thread.start();  // If I Use the  "thread.start()",  a new thread will be Created , 
							//that thread will responsible for Executing the job Here
		
		// Execution Order Will be Maintained, Since no thread has been Created.
//		thread.run();    // If I Use "thread.run()" will be Exceuted just like normal method called by mainThread only.
		
		for(int k = 0 ; k < 10; k++) {
			System.out.println("Main Thread");
		}
		
	}

}
