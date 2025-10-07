package com.java.Classes_AND_Objects;


//Creation of Object Using clone() method


public class CloneMethodObjCreation implements Cloneable {

	String name = "GeeksforGeeks";
	
	
	protected Object clone() throws CloneNotSupportedException {
		
        // Super() keyword refers to parent class
		return super.clone();
		
	}
	
	
	public static void main(String[] args) {

		CloneMethodObjCreation o1 = new CloneMethodObjCreation();
		
		try {
			
			CloneMethodObjCreation o2 = (CloneMethodObjCreation) o1.clone();
			System.out.println(o2.name);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
