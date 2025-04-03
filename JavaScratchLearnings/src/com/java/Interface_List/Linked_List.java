package com.java.Interface_List;

import java.util.LinkedList;

public class Linked_List {

	public static void main(String[] args) {

		LinkedList<String> ll = new LinkedList<String>();

		ll.add("Geeks");
		ll.add("Geeks");
		ll.add(1, "For");

		System.out.println("Initial LinkedList : " + ll);

		ll.add(3, "Course");
		System.out.println("After Updating : " + ll);

		ll.remove(1);
		System.out.println("After the Index Removal : " + ll);

//		ll.remove("Geeks");
//		System.out.println("After the Object removal : " + ll);

		// Using the Get method and the
		// for loop

		for (int i = 0; i < ll.size(); i++) {
			System.out.print(ll.get(i) + " ");
		}

		System.out.println();

		for (String str : ll) {
			System.out.print(str + " ");
		}

		System.out.println();

		// Linked list to To Array by using toArray()

		LinkedList<Integer> list = new LinkedList<Integer>();

		list.add(102);
		list.add(123);
		list.add(104);
		list.add(115);
		list.add(166);

		System.out.println("Linked List : " + list);

		// Conversion Linked list to To Array by using toArray()

		Object[] a = list.toArray();

		System.out.print("After Converted LinkedList to Array : ");
		for (Object element : a) {
			System.out.print(element + " ");
		}
		
		System.out.println();
		
//  size() of list
		
		System.out.println("Size of Array List : " + list.size());
		
		System.out.println("Current Linked list : " + list);
		
		//The  remove first element is
        System.out.println("The  remove first element is: " + list.removeFirst());
        
        System.out.println("Final Linked list : " + list);

		
		
	}

}
