package com.java.Exceptions;

public class MultipleCatchBlocks {

//	
//	try {
//	 ------  Arithmentic Exception
//	 ------ FileNotFoundException
//	 ------ SQL Exception
//		
//	}
//	catch(Exception e) {
//		Same Exception Handling for All Exceptions
//		Results in Same ExceptionHandling Result for Various Types of Exceptions
//	}
//	
	
	//The order Of the Catch Blocks Should Be maintained From Child ---> Parent
	//													Not From Parent ---> Child 
//	
//	Parent  -  Exception
//	Child   -  Arithmentic Exception
	public static void main(String[] args) {

		try {
			System.out.println(10/0);  // Arithementic EWxception Raised
		} 
//			catch (Exception e) {
//			System.out.println("Exception");
//		}
		// Uncomment The below Code Snippet to get Proper Exception 
		
		catch(ArithmeticException e) {
			System.out.println("Arithmentic Exception");
		}
		catch (Exception e) {
			System.out.println("Exception");
		}
		
	}

}
