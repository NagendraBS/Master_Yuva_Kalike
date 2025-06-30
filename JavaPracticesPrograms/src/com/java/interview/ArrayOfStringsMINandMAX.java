package com.java.interview;

public class ArrayOfStringsMINandMAX {

	public static void main(String[] args) {

		String str = "I am Working under EndavaSolutions";
		
		String[] eachWord = str.split(" ");
		
		String longestWord = "";
		
		for( String word : eachWord ) {
			
//			System.out.println(word + " ");
			
			if(word.length() > longestWord.length()) {
				longestWord = word;
			}
			
		}
		
		System.out.println("Longest Word : " + longestWord);

	}

}
