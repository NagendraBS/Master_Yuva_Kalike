package com.java.ExamplesOfCollectionsClasses;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AddAllMethod {

	public static void main(String[] args) {

		List<String> arrayList = new ArrayList<String> ();
		
        // Adding elements to the list
		arrayList.add("Clothes");
		arrayList.add("Toyes");
		
		// Add one or more elements
        Collections.addAll(arrayList, "Fruits", "Bat", "Ball");
		
		System.out.println(arrayList);
		
		for(int i = 0; i < arrayList.size(); i++) {
			System.out.println("ArrayList Elements are : " + arrayList.get(i));
		}
		
		
	}

}
