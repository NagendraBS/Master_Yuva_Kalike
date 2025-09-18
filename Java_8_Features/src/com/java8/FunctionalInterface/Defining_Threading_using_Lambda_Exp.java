package com.java8.FunctionalInterface;

public class Defining_Threading_using_Lambda_Exp {

	public static void main(String[] args) {

		Runnable r = ()->{  
							for(int i= 0; i < 10; i++) 
								{
									System.out.println("Child Thread");
									}

								};
	//Starting the Thread				
								
	Thread t = new Thread (r);
		
		
		
//		Thread t = new Thread (  ()-> {
//			
//			for(int i=0 ; i<10; i++) {
//				System.out.println("Child thread");
//			}
//			
//		}
//				);
		
	
//	t.start();
	
	
	
	for(int i = 0; i<10; i++) {
		System.out.println("Main Thread");
	}
	
	}

}
