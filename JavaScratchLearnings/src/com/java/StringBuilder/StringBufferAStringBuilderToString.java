package com.java.StringBuilder;

public class StringBufferAStringBuilderToString {

	public static void main(String[] args) {

		StringBuilder sbl =  new StringBuilder("Nagendra");
		StringBuffer sbf = new StringBuffer("Yuvaraj");
		
		System.out.println("String Builder Object : " + sbl);
		System.out.println("String Builder Object : " + sbf);
		
		
		//concate String Builder and String Buffer
		System.out.println("Appending String Builder Object with String Builder Object : " + sbl.append(sbf));
		
		// Converting StringBuffer object to String using toString() method
		String s1 = sbf.toString();
		System.out.println("Convereted StringBuffer to String : " + s1);
		
		//trying to Concat the s1 String to become "Yuvaraj Developer"
		s1.concat(" Developer");
		System.out.println(s1);
		
		
		
		// Converting StringBuilder object to String using toString() method
				String s2 = sbl.toString();
				System.out.println("Convereted StringBuiler to String : " + s2);
		
		//trying to Concat the s2 String to become "Nagendra Architect"
				s2.concat(" Architect");
				System.out.println(s2);
		
		
	}

}
