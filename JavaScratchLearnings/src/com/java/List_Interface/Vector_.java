package com.java.List_Interface;

import java.util.Vector;

public class Vector_ {

	public static void main(String[] args) {

		Vector<Integer> v  = new Vector<Integer>();
		
		v.addElement(1);
		v.addElement(2);
		v.addElement(3);
		v.addElement(4);
		
        // Insert an element at index 1
		v.add(1, 20);
		
        // Remove the element at index 2
		v.removeElementAt(2);
		
        // Print the elements of the vector
		for(int i : v) {
			System.out.println(i);
		}
		
		
	}

}
