package com.java.DesignPrinciples.SOLID;


//Notification Class

interface NotificationChannel {
    void send(String message);
}

class EmailChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Email sent: " + message);
    }
}

class SmsChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Short Message Service sent: " + message);
    }
}


// Member Validator Class

class MemberValidator {
    public void validateMember(String memberId) {
        if (memberId == null || memberId.isBlank()) {
            throw new IllegalArgumentException("Invalid member identifier");
        }
    }
}


// Claims Approval policies

interface ClaimApprovalPolicy {
    double approve(double claimAmount);
}

class StandardApprovalPolicy implements ClaimApprovalPolicy {
    @Override
    public double approve(double claimAmount) {
        return claimAmount * 0.80;
    }
}

class PremiumApprovalPolicy implements ClaimApprovalPolicy {
    @Override
    public double approve(double claimAmount) {
        return claimAmount * 0.95;
    }
}


// Claim Stores and Processing 

class ClaimStore {
    public void save(String claimId, String memberId, double approvedAmount) {
        System.out.println("Claim saved: " + claimId + ", Member: " + memberId + ", Approved Amount: " + approvedAmount);
    }
}

class ClaimProcessingService {
    private MemberValidator memberValidator;
    private ClaimApprovalPolicy approvalPolicy;
    private ClaimStore claimStore;
    private NotificationChannel notificationChannel;

    public ClaimProcessingService(MemberValidator memberValidator,
                                  ClaimApprovalPolicy approvalPolicy,
                                  ClaimStore claimStore,
                                  NotificationChannel notificationChannel) {
        this.memberValidator = memberValidator;
        this.approvalPolicy = approvalPolicy;
        this.claimStore = claimStore;
        this.notificationChannel = notificationChannel;
    }

    public void processClaim(String claimId, String memberId, double claimAmount) {
        memberValidator.validateMember(memberId);

        if (claimAmount <= 0) {
            throw new IllegalArgumentException("Claim amount must be greater than zero");
        }

        double approvedAmount = approvalPolicy.approve(claimAmount);
        claimStore.save(claimId, memberId, approvedAmount);
        notificationChannel.send("Claim " + claimId + " processed with approved amount " + approvedAmount);
    }
}




public class SOLIDCombinedDemo {

	public static void main(String[] args) {

		ClaimProcessingService service = new ClaimProcessingService(
                new MemberValidator(),
                new PremiumApprovalPolicy(),
                new ClaimStore(),
                new EmailChannel()
        );

        service.processClaim("CLM5001", "MEM1001", 12000);
		
	}

}
