package com.springcore.beanLifeCyclebyProgrammaticApproach;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

import ch.qos.logback.core.net.SyslogOutputStream;


//Initialization of Bean by Programatic Approach

//we need to implement our bean with two interfaces namely InitializingBean, 
//DisposableBean and will have to override afterPropertiesSet() and destroy() method.



public class HelloWorld implements InitializingBean, DisposableBean {

	
	
	// It is the init() method
    // of our bean and it gets
    // invoked on bean instantiation
	
	@Override
	public void afterPropertiesSet() throws Exception {
		
		System.out.println(
	            "Bean HelloWorld has been "
	            + "instantiated and I'm the "
	            + "init() method");
	}
	
	
	// This method is invoked
    // just after the container
    // is closed
	
	@Override
	public void destroy() throws Exception {
		System.out.println(
	            "Container has been closed "
	            + "and I'm the destroy() method");		
	}


	
}
