package com.java.DesignPrinciples.SOLID;

/*Interface Segregation Principle
Meaning :

A class should not be forced to implement methods it does not need.

Use small specific interfaces instead of one big interface.*/

interface RetailClaimService {
    void processRetailClaim();
}

interface MailOrderClaimService {
    void processMailOrderClaim();
}

interface InventoryService {
    void manageInventory();
}



class RetailClaimProcessor implements RetailClaimService {
    @Override
    public void processRetailClaim() {
        System.out.println("Retail claim processed");
    }
}

class MailOrderProcessor implements MailOrderClaimService {
    @Override
    public void processMailOrderClaim() {
        System.out.println("Mail order claim processed");
    }
}

class PharmacyInventoryManager implements InventoryService {
    @Override
    public void manageInventory() {
        System.out.println("Pharmacy inventory managed");
    }
}


/*
 * Why this is good
 * 
 * Each class implements only what it actually needs(Methods) its because of the
 * Methods Segregation with the Interfaces.
 */

public class InterfaceSegregationPrinciple {

	public static void main(String[] args) {

		RetailClaimService retailService = new RetailClaimProcessor();
        MailOrderClaimService mailService = new MailOrderProcessor();
        InventoryService inventoryService = new PharmacyInventoryManager();

        retailService.processRetailClaim();
        mailService.processMailOrderClaim();
        inventoryService.manageInventory();
		
	}

}
