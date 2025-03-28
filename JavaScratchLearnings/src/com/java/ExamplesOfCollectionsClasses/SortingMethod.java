package com.java.ExamplesOfCollectionsClasses;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortingMethod {

	public static void main(String[] args) {

		List<String> arrayList = new ArrayList<String>();
		
		// Adding elements to the list
        // using add() method
		arrayList.add("Books");
		arrayList.add("Laptop");
		
		 // Adding one or more 
        // element using addAll()
		Collections.addAll(arrayList, "Mobiles", "Sheets", "Bottels", "Apple");
		
		System.out.println("Before Sorting : " + arrayList);
		
		// Sorting according to default ordering
        // using sort() method
		Collections.sort(arrayList);
		
		System.out.println("After Sorting : " + arrayList);
		
		System.out.println();
		
        // Printing the elements
		for(int i = 0; i < arrayList.size(); i++) {
			System.out.print(arrayList.get(i) + " " );
		}
		
		System.out.println();
        // Sorting according to reverse ordering
		Collections.sort(arrayList, Collections.reverseOrder());
		
		System.out.print("Reversed the Sorted Elements : " + arrayList);
		
	}

}
