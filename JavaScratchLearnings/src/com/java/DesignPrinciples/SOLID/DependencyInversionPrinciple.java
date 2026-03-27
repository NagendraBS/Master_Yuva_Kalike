package com.java.DesignPrinciples.SOLID;

/*Dependency Inversion Principle
Meaning

High-level Classes should not depend on low-level classes directly.
Both should depend on abstractions.*/

interface NotificationSender {
	// this is Abstraction here
    void send(String message);
}

class EmailNotificationSender implements NotificationSender {
    @Override
    public void send(String message) {
        System.out.println("Sending Email: " + message);
    }
}

class SmsNotificationSender implements NotificationSender {
    @Override
    public void send(String message) {
        System.out.println("Sending Short Message Service: " + message);
    }
}

class PriorAuthorizationService {
    private NotificationSender notificationSender;

    public PriorAuthorizationService(NotificationSender notificationSender) {
        this.notificationSender = notificationSender;
    }

    public void approveRequest(String requestId) {
        System.out.println("Prior authorization approved for request: " + requestId);
        notificationSender.send("Request " + requestId + " approved");
    }
}

/*
 * Why this is good
 * 
 * Now the service depends on NotificationSender, which is an abstraction.
 * 
 * You can switch Email, Short Message Service, Push Notification, or WhatsApp
 * without changing business logic.
 */


public class DependencyInversionPrinciple {

	public static void main(String[] args) {

		NotificationSender sender = new EmailNotificationSender();
        PriorAuthorizationService service = new PriorAuthorizationService(sender);
        service.approveRequest("PA-9001");
		
		
	}

}
