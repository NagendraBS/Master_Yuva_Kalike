package com.java.DesignPrinciples.SOLID;



/* Single Responsibility Principle:
	
Why:

If one class handles multiple responsibilities, then a change in one responsibility may affect another.

That makes the class:

hard to understand
hard to test
hard to maintain

A class should change for one reason only.

What:

Single Responsibility Principle means: A class should have only one responsibility, or one reason to change.

Responsibility means a clear job.

For example:

saving employee data
calculating salary
sending email
generating report

These are different jobs, so ideally they should be in different classes. */



class EmployeeRepository {
    public void saveEmployee(String name) {
        System.out.println("Saving employee: " + name);
    }
}

class EmployeeReportService {
    public void generateReport(String name) {
        System.out.println("Generating report for: " + name);
    }
}

class EmailService {
    public void sendEmail(String name) {
        System.out.println("Sending email to employee: " + name);
    }
}


public class SingleResponsibilityPrinciple {

	public static void main(String[] args) {

		
		EmployeeReportService reportService = new EmployeeReportService();
		EmployeeRepository repository = new EmployeeRepository();
		EmailService emailService   = new EmailService();
		
		reportService.generateReport("Nagendra");
		repository.saveEmployee("Nagendra");
		emailService.sendEmail("Nagendra");
	}

}



/* How to use in real projects

When writing a class, ask:

Does this class have more than one job?
If business rules change, how many different teams or reasons can affect this class?
Can I describe this class in one simple sentence?

Good example:

UserRepository → manages database operations
InvoiceCalculator → calculates bill
EmailNotifier → sends email

Not good:

UserManager doing validation, saving, emailing, logging, file generation, and report creation */
