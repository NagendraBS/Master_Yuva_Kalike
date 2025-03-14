package com.java.MethodCalling;

public class PredefinedMethods {

	public static void main(String[] args) {

		// Creating object of the class in main() method
		PredefinedMethods pm = new PredefinedMethods();
		
        // Calling predefined method
		System.out.println(pm.hashCode());
		
//		A hash code is an integer that is used to uniquely identify objects when they are stored 
//		in data structures like hash tables, HashMap, HashSet, etc.
//		The hashCode() method is defined in the Object class, which means all classes in Java inherit this method.
		
	}

}
