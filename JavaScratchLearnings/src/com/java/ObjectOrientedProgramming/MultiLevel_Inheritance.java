package com.java.ObjectOrientedProgramming;

//Parent class One
class One1{
	
	public void print_geek() {
		System.out.println("Geeks");
	}
	
}


//Child class Two inherits from class One
class Two2 extends One1{
	
	public void print_for() {
		System.out.println("for");
	}
	
}


//Child class Three inherits from class Two
class Three3 extends Two2{
	
	public void print_lastgeek() {
		System.out.println("Geeks");
	}
}



public class MultiLevel_Inheritance {

	public static void main(String[] args) {

        // Creating an object of class Three
		Three3 g = new Three3();
		
		// Calling method from class One
        g.print_geek();
        
        // Calling method from class Two
        g.print_for();
        
        // Calling method from class Three
        g.print_lastgeek();
		
	}

}
