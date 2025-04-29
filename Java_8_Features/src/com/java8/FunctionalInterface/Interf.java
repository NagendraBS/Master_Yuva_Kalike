package com.java8.FunctionalInterface;

@FunctionalInterface
interface Interfa {

	//case 1  (VALID)
	
	public void m1();
	 
	default void m2() {
		
	}
	
	public static void m3() {
		
	}
	
	//case 2  (INVALID)
	
//	public void m1();
//	public void m();
	
	
}
