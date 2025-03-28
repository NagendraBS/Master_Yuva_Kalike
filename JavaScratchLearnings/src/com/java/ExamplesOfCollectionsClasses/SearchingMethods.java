package com.java.ExamplesOfCollectionsClasses;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//Binary Search using Collections.binarySearch()


public class SearchingMethods {

	public static void main(String[] args) {

		List<String> arrayList = new ArrayList<String>();
		
		arrayList.add("Mouse");
		arrayList.add("KeyBoard");
		
		Collections.addAll(arrayList, "Laptops", "CPU's", "Speakers");
		
		//Printing the Elements Form the ArrayList
		for(int i = 0; i < arrayList.size(); i++) {
			System.out.println(" " + arrayList.get(i));
			
		}
		
		// BinarySearch on the List
		System.out.println("  The index of Laptops is: " + Collections.binarySearch(arrayList, "Laptops"));
		System.out.print("  The index of Speakers is: " + Collections.binarySearch(arrayList, "Nag"));
	}

}
