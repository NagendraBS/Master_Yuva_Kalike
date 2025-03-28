package com.java.ExamplesOfCollectionsClasses;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CopyingElementsMethods {

	public static void main(String[] args) {

		//List Original
	List<String> arrayList = new ArrayList<String>();
	
	arrayList.add("Red");
	arrayList.add("Blue");
	arrayList.add("Yellow");
	
	Collections.addAll(arrayList, "Pink", "Black");
	// Print the elements
	
    System.out.println(
        "The Original Destination list is: ");
	
	System.out.println(arrayList);
	
	for(int i = 0 ; i < arrayList.size(); i++) {
		System.out.println(arrayList.get(i));
	}
	
	System.out.println();
	
    // Create source list	
	List<String> arrayListCopy = new ArrayList<String>();
	
	arrayListCopy.add("White");
	arrayListCopy.add("Green");

	
    // Copy the elements from source to destination
	Collections.copy(arrayList, arrayListCopy);
	
	 // Printing the modified list
    System.out.println(
        "The Destination List After copying is: ");
	
    System.out.println(arrayListCopy);
    
	for (int i=0; i < arrayList.size(); i++) {
		System.out.println(arrayList.get(i));
	}
	
	System.out.println(arrayList);
	}

}
