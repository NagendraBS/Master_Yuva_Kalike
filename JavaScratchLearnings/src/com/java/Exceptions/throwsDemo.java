package com.java.Exceptions;


// throws : To Delegate the Responsibility of Exception Handling to the Caller.
// In this Case " Thread.sleep(1000) " Called By doMoreStuff()
//  doMoreStuff() is Called by  doStuff()
// doStuff() is Called by main()
// Ultimately main() method is called by JVM only


// If JVM is Going to handle the Exceptions Means it Will give ABNORMAL TERMINATION, But in this case it was not Happen

// You declare throws but no exception occurs	 ✅ Normal termination
// You declare throws and exception occurs	     ❌ JVM handles it → Abnormal termination (if uncaught)
//You catch the exception using try-catch	✅ Normal termination (you handled it manually)
 
public class throwsDemo {

	public static void main(String[] args) throws InterruptedException {
		doStuff();
		
	}
	
	public static void doStuff() throws InterruptedException {
		doMoreStuff();
	}
	
	public static void doMoreStuff() throws InterruptedException  {
		Thread.sleep(1000);
		System.out.println("Thread Slept...");
	}

}
