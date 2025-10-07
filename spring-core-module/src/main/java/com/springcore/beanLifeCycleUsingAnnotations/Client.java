package com.springcore.beanLifeCycleUsingAnnotations;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Client {


		public static void main(String[] args) {

			// Loading the Spring XML configuration
	        // file into the spring container and
	        // it will create the instance of
	        // the bean as it loads into container

			ConfigurableApplicationContext cap = new ClassPathXmlApplicationContext("classpath:com/springcore/beanLifeCycleUsingAnnotations/spring.xml");
			
		// It will close the spring container
	    // and as a result invokes the
	    // destroy() method
		
		System.out.println(" ");
		System.out.println("Container Closed (Bean Need to Be Destroyed)");
		System.out.println(" ");
		cap.close();
		
		
		}

	}


