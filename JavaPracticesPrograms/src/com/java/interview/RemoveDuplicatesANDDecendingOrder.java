package com.java.interview;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//Remove duplicates from a List<String> and sort it in descending order


public class RemoveDuplicatesANDDecendingOrder {

	public static void main(String[] args) {

		
		List<String> myList = Arrays.asList("Apple","Banana","Kewi","Banana","Mango","Cherry","Straberry", "Grapes", "Mango");
		
		System.out.println( "myList : " + myList);
		
		List<String> resultList = ProcessList(myList);
		
		System.out.println("Resulted List Descending order: " + resultList);
		
	}
	
	
	public static List<String> ProcessList(List<String> inputString){
		
		Set<String> uniqueSet = new HashSet<String>(inputString) ; // Removes duplicates from the List, Since Set Allows Only the Unique Elements
		
		List<String> resultList = new ArrayList<String>(uniqueSet); // Converting back to the List
		
		resultList.sort(Collections.reverseOrder());  // Sort in descending order
		
		return resultList;
		
	}
	

}
 