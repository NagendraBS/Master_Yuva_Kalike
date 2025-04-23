package com.java.MultiThreading;


class MyThreadDemo1 extends Thread{
	
	
}


// Highly Recommended to Use OverrideMethod
public class OverRidingRunMethod {

	public static void main(String[] args) {

		MyThreadDemo1 t = new MyThreadDemo1();  
		t.start();     // We Won't get any Output here
	
	}

}
