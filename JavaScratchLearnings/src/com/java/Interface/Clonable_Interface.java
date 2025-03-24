package com.java.Interface;


class N implements Cloneable{
	int i;
	
    // A class constructor
	public N(int i) {
		this.i = i;
	}
	
	// Overriding clone() method
    // by simply calling Object class clone() method.

	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
}


public class Clonable_Interface {

	public static void main(String[] args) throws CloneNotSupportedException {

		N a = new N(20);
		
		// cloning 'a' and holding
        // new cloned object reference in b

        // down-casting as clone() return type is Object
		N b = (N) a.clone();
		
		System.out.println(b.i);
		
	}

}
