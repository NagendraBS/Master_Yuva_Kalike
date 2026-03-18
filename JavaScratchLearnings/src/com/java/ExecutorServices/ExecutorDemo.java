package com.java.ExecutorServices;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorDemo {

	public static void main(String[] args) {


		PrintJob[] jobs = { 
				
				new PrintJob("Nag"),
				new PrintJob("Srini"),
				new PrintJob("Kala"),
				new PrintJob("Yuva"),
				new PrintJob("Durga"),
				new PrintJob("Ravi")
		};
		
		ExecutorService service = Executors.newFixedThreadPool(3);
		
		for( PrintJob job : jobs) {
			
			service.submit(job);
			
		}
		
			service.shutdown();
	}
	
}


class PrintJob implements Runnable{

	String name;
	
	public PrintJob(String name) {
		this.name = name;
	}
	
	
	@Override
	public void run() {

		System.out.println(name + "....Job started by Thread : " + Thread.currentThread().getName());
		
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {

		}
		
		System.out.println(name + "...Job Completed by Thread : " + Thread.currentThread().getName());
	}
	
}