package com.springcore.beanLifeCyclebyXML;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Client {

	public static void main(String[] args) {

		// Loading the Spring XML configuration
        // file into the spring container and
        // it will create the instance of
        // the bean as it loads into container

	ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("classpath:com/springcore/beanLifeCyclebyXML/spring.xml");
	
	// It will close the spring container
    // and as a result invokes the
    // destroy() method
	System.err.println(" ");
	System.out.println("Container Closed (Bean Need to Be Destroyed)");
	System.out.println(" ");
	context.close();
	
	
	}

}
