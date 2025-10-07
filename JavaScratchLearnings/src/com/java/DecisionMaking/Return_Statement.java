package com.java.DecisionMaking;

public class Return_Statement {

	
	public String return_Statment() {
		
		
		boolean t = true;

//		boolean t = false;
		
		System.out.println("Before the return");
		
		if(t) {
			String str = "I am Returning... string";
	
			return str;
		}
		
		
		// Compiler will bypass every statement after return
		System.out.println("This Won't be execute");
		
		return null ;
		
	}
	
	public static void main(String[] args) {

		Return_Statement ret = new Return_Statement();
//		ret.return_Statment();
		
		System.out.println("Retrun: " + ret.return_Statment());
		
	}
	

}
