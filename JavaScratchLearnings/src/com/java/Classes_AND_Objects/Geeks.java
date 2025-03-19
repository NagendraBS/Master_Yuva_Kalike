package com.java.Classes_AND_Objects;

//Java code demonstrates creating an object using the newInstance() method.

public class Geeks {

	// Decalring and Initializing the String
	String n = "GeeksforGeeks";

	public static void main(String[] args) {

		// Try block to check for exceptions

		try {
			// Correcting the class name to match "Geeks"
			Class<?> c = Class.forName("Geeks");

			// Creating an object of the main class using reflection
			Geeks o = (Geeks) c.getDeclaredConstructor().newInstance();

            // Print and display

			System.out.println(o.n);

		}

		catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}

		catch (Exception e) {
			e.printStackTrace();
		}

	}

}
