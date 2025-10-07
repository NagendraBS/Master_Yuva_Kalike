package com.example.Java_Collections;

import java.util.*;

public class HashsetDemo3 {

	public static void main(String[] args) {

		
	HashSet<Integer> set1 = new HashSet<Integer>();
	
	set1.add(1);
	set1.add(2);
	set1.add(3);
	set1.add(4);
	set1.add(5);
	
	System.out.println( "set1 : "+ set1);
	
	
	
	
	HashSet<Integer> set2 = new HashSet<Integer> ();
	
	set2.add(3);
	set2.add(4);
	set2.add(5);
	
	System.out.println("set 2 : " +set2);
	
	
	
	
	//Union 
	set1.addAll(set2);
	
	System.out.println("Union : " + set1);
	
	//Intersection
	
//	set1.retainAll(set2); // Except set12 element in set1 rest of the Elements will be Excluded
	System.out.println("Intersection : " + set1);
	
	
	//Difference
	
	set1.removeAll(set2);
	
	System.out.println("Difference : " + set1);
	
	
	//susbset
	
	set1.containsAll(set2);
	set2.containsAll(set1);

	System.out.println(set1.containsAll(set2));
	System.out.println("Subset Set1 :" + set1);
	
	System.out.println(set2.containsAll(set1));
	System.out.println("Subset Set2 :" + set2);

	
	
	}

	
}
