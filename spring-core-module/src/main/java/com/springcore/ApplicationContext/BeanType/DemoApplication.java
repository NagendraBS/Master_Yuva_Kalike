package com.springcore.ApplicationContext.BeanType;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;


public class DemoApplication {

	// Main driver method
	  public static void main(String[] args) {


	    // Creating its object
	    ApplicationContext context = new 
	    		AnnotationConfigApplicationContext(AppConfig.class);

	    Student student = context.getBean(Student.class);

	    // Print and display
	    System.out.println(student);
	  }

}
