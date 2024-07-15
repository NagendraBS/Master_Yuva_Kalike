package com.springcore.beanLifeCycleUsingAnnotations;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

//Implementation of Bean using Annotation Method

//To provide the facility to the created bean to invoke 
//custom init() method on the startup of a spring container 
//and to invoke the custom destroy() method on closing the container,
//we need to annotate init() method by @PostConstruct annotation 
//and destroy() method by @PreDestroy annotation.


// @PostConstruct :  Identify the Method that Will be Executed after dependency Injection is done
//                   to Performany Initialization


// @PreDestroy : Identify the Method that Will Receive the Call back Notification to Signal that the 
//               Instance is in process of being removed by the Container.


public class HelloWorld {

	// Annotate this method to execute it
    // automatically as the bean is
    // instantiated

	@PostConstruct
	public void init() throws Exception {
		System.out.println(
	            "Bean HelloWorld has been "
	            + "instantiated and I'm the "
	            + "init() method");
		
	}
	
	
	// Annotate this method to execute it
    // when Spring container is closed
	
	@PreDestroy
	public void destroy() throws Exception{
		System.out.println(
	            "Container has been closed "
	            + "and I'm the destroy() method");
		
	}
	
	
}
