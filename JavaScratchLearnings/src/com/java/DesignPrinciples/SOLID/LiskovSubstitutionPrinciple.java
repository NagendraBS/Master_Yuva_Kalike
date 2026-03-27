package com.java.DesignPrinciples.SOLID;


/*A child class should be able to replace its parent class without breaking the program.
If parent type is expected, child object should behave correctly. 
*/

interface ProcessableOrder {
    void processOrder();
}

class RetailDrugOrder implements ProcessableOrder {
    @Override
    public void processOrder() {
        System.out.println("Processing retail drug order");
    }
}

class MailOrderDrugOrder implements ProcessableOrder {
    @Override
    public void processOrder() {
        System.out.println("Processing mail order drug order");
    }
}

class OrderProcessor {
    public void process(ProcessableOrder order) {
        order.processOrder();
    }
}



/*
 * Why this is good 
 * Every implementation of ProcessableOrder behaves properly.
 * 
 * No child class is breaking parent expectations.
 */
 

public class LiskovSubstitutionPrinciple {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
