package com.java.MethodCalling;

//Helper Class
class Test{
	
	public static int i = 0;
	
    // Constructor to count objects
	Test(){
		i ++ ;
	}
	
	 // Static method to get the number of objects created
	public static int get() {
		return i;
	}
	
	public int m1() {
		System.out.println("Inside method m1");
		this.m2();   // Calling Method m2()
		return 1;
			
	}
	
    // Method m2 that prints a message
	public void m2() {
		System.out.println("In Method m2");
	}
	
}

public class CallingMethodsDiffWay {

	public static void main(String[] args) {

        // Creating object of Test class
		Test obj = new Test();
		
		//calling Method m1()
		int i = obj.m1();
		System.out.println("Control returned after m1 : " + i);
		
		int o = Test.get();
		System.out.println("Number of Instances Created " + o);
		
	}

}
