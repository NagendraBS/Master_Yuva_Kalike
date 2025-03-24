package com.java.Interface;


@FunctionalInterface
interface Square{
	int calculate(int x);
	
}

class Functional_Interface{
	
	public static void main(String args[]) {
		
		int a = 5;
		
		// lambda expression to define the calculate method
		 Square s = (int x) -> x * x ;
		
		int ans = s.calculate(a);
		System.out.println(ans);
		 
	}
	
}