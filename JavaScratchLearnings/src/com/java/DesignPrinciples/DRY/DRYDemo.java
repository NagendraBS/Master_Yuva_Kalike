package com.java.DesignPrinciples.DRY;

class ClaimService{
	
	public void processRetailClaim(String memberId) {
        if (!isValidMember(memberId)) return;

        System.out.println("Processing retail claim...");
    }

    public void processMailClaim(String memberId) {
        if (!isValidMember(memberId)) return;

        System.out.println("Processing mail claim...");
    }

    // Added DRY Principle , Single Validations Code is using in  "processRetailClaim" & "processMailClaim"
    
    private boolean isValidMember(String memberId) {
        if (memberId == null || memberId.isEmpty()) {
            System.out.println("Invalid member ID");
            return false;
        }
        return true;
    }

}



public class DRYDemo {

	public static void main(String[] args) {

		ClaimService service = new ClaimService();
		
		service.processMailClaim("101");
		
		service.processRetailClaim(null);
		
		
	}

}
