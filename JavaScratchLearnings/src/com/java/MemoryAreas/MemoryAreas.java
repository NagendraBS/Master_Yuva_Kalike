package com.java.MemoryAreas;

public class MemoryAreas {

    // static variables are stored in the Method Area
	static int p=20;
	
    // instance variables are stored in the Heap
	int q = 30;
	
	public  void display() {
        // local variables are stored in the Stack
		int r = 40;
		
//		System.out.println(q);
		System.out.println(r);
		System.out.println(p);

	}
	
	public static void main(String[] args) {

		// Calling the Display method
		MemoryAreas ma = new MemoryAreas();
		System.out.println(p);
		
//		display();
		
	}

}