package com.java8.FunctionalInterface;

public class Anonymous_Inner_Class {

	public static void main(String[] args) {

		Runnable r = new Runnable() {     
										// Anonymous Inner Class Starts
			@Override
			public void run() {

				for(int i=0; i<10; i++) {
					System.out.println("Child Thread");
				}
			}
		};					//// Anonymous Inner Class Ends
		
		
		Thread t = new Thread(r);
		
		t.start();
		
		for(int i=0; i<10; i++) {
			System.out.println("Main Thread");
		}
		
	}

}
