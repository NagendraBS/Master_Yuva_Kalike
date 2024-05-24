package com.example.Java_Collections;

import java.util.*;

public class LinkedHashSetDemo
{
	
	public static void main(String[] args) {
		
		//Insertion Order is preserved
		LinkedHashSet<Integer> lhs = new LinkedHashSet<Integer>();
		
		
		//Insertion Order is Not Preserved
//		HashSet hs =  new HashSet();    
		
		
		lhs.add(100);
		lhs.add(300);
		lhs.add(700);
		lhs.add(400);
		lhs.add(800);
		
		
		System.out.println(lhs);
		
	}
	
}
