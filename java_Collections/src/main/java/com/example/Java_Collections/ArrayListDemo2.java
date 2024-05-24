package com.example.Java_Collections;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class ArrayListDemo2 {

	public static void main(String[] args) {

		ArrayList al = new ArrayList();	
		
		al.add("N");
		al.add("B");
		al.add("S");
		al.add("A");
		al.add("S");
		al.add("N");
		
		System.out.println("Elements in the ArrayList : " +al);
		
		
		// Sort ------------collections.sort
		
		Collections.sort(al);
		
		System.out.println("Elements in the ArrayList after Sorting : "+ al);
		
		// Sorting Elements In  Reverse order
		Collections.sort(al,Collections.reverseOrder());
		
		System.out.println("Elements in the ArrayList in ReverseOrder : "+ al);

		
		//Shuffling------------------------  
		
		Collections.shuffle(al);
		
		System.out.println("Elements in the ArrayList after Shuffling" + al);
		
		
		
		// Duplicate ArrayList
//		ArrayList al_dup = new ArrayList();
//		
//		al_dup.addAll(al);
		
//		al_dup.remove(4);
//		al_dup.remove("A");
//		al_dup.removeAll(al_dup);
		
//		System.out.println( "Duplicate Array List :" + al_dup);
		
		
		
		
		
		


	}

}
