package com.java.ObjectOrientedProgramming;

//Different Ways of Method Overloading in Java
//  1.Changing the Number of Parameters.
//  2.Changing Data Types of the Arguments.
//  3.Changing the Order of the Parameters of Methods


//Example for => "Changing the Number of Parameters"

class Product{
	
	// Method 1
    // Multiplying two integer values
	public int multiply(int a, int b) {
		
		int prod = a* b;
		return prod;
	}
	
	// Method 2
    // Multiplying three integer values
	public int multiply(int a, int b, int c) {
		
		int prod = a * b * c;
		return prod;
	}
}


public class MethodOverloading {

	public static void main(String[] args) {

		// Creating object of above class inside main()
        // method
		Product obj = new Product();
		
		int prod1 = obj.multiply(2, 3);
		
		// Printing Product of 2 numbers
        System.out.println(
            "Product of the two integer value :" + prod1);

		int prod2 = obj.multiply(5, 4, 2);
		
		// Printing Product of 3 numbers
        System.out.println(
            "Product of the three integer value :" + prod2);

	}

}
