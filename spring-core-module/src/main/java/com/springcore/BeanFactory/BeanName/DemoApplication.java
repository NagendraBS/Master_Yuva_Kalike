package com.springcore.BeanFactory.BeanName;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DemoApplication {

	// Main driver method
	  public static void main(String[] args) {


	    // Creating its object
		  BeanFactory factory = new ClassPathXmlApplicationContext("com/springcore/BeanFactory/BeanName/beanfactoryname.xml");
	    
	    // Calling bean By Name = "yuva", Configured in .xml File
		  
		  Student student = (Student) factory.getBean("yuva",Student.class);

	    // Print and display
	    System.out.println(student);
	  }

}
