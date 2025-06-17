package com.java.interview;

public class ArrayOfStringsMINandMAX {

	public static void main(String[] args) {

		String str = "I am Working under EndavaSolutions";
		
		
		String[] words = str.split("\\s+");
		
		String longest = "";
		
		for(String word : words) {
		
            if (word.length() > longest.length()) {
            	
            	longest = word;
            }
            
            }
		
			System.out.println("longest Word is : " + longest);
		
		}
	
		
	}

