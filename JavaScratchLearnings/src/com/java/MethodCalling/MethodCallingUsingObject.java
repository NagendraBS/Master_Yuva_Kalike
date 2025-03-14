
package com.java.MethodCalling;

class Add{
	
	int s = 0 ;
	public int addNumbers(int a, int b) {
		
		s= a + b ;
		return s;
		
	}
}


public class MethodCallingUsingObject {

	public static void main(String[] args) {

		Add add = new Add ();
		int sum = add.addNumbers(4, 3);
		System.out.println("Sun of Two intergers are : " + sum);
	}

}
