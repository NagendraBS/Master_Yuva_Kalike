package com.java.Classes_AND_Objects;

import java.util.ArrayList;

//Autoboxing- primitive to Character object
// conversion

public class WrapperClassAutoboxing {

	public static void main(String[] args) {
		
		char ch = 'S';
		
		//Autoboxing the primitive Datatype to Character object
		Character chObj = ch;
		
		System.out.println(chObj);
		
		
		
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		
        // Autoboxing because ArrayList stores only objects
		arrayList.add(25);
		
        // printing the values from object
		System.out.println(arrayList.get(0));
		

	}

}
