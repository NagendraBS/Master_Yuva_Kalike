package com.java.Generics;

import java.util.ArrayList;

class MyCustomList <T> {
	 
	ArrayList <T> list = new ArrayList<T>();
	
	public void addElements(T element) {
		list.add(element);
	}
	
	public void removeElements(T element) {
		list.remove(element);
	}
	
	@Override
	public String toString() {
		return list.toString();
	}
	
	public T get(int index) {
		return list.get(index);
	}
	
}


public class GenericsRunner {

	public static void main(String[] args) {

		MyCustomList<String> list = new MyCustomList<String>();
		
		//Finding the Execution time of the Method/ Code Snippets/ Lines of Code
		
		long t_s = System.nanoTime();
		
		list.addElements("Element 1");
		list.addElements("Element 2");
		String s = list.get(0);
		
		System.out.println(list);
		System.out.println(s);
		

		
		MyCustomList<Integer> list2 = new MyCustomList<Integer>();
		list2.addElements(Integer.valueOf(5));
		list2.addElements(Integer.valueOf(8));
		Integer i = list2.get(0);
		
		System.out.println(list2);
		
		System.out.println(i);
		
		long t_f = System.nanoTime();
		
		long diff = t_f - t_s;
		
		System.out.println(diff);

	}

}
