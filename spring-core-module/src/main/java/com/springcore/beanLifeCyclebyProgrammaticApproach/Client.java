package com.springcore.beanLifeCyclebyProgrammaticApproach;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Client {

	public static void main(String[] args)  throws Exception{

//Loading the SpringXML Configuration file into Spring Container
//and It will Create the Instance of the Bean as it Loads into Container.
		
		ConfigurableApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:com/springcore/beanLifeCyclebyProgrammaticApproach/spring.xml");
		
		System.out.println(" Closing Spring Container.  Calling Destroy Method  ! ");
		
		System.out.println("  ");
//It will Close the Spring Conainer and as a Result,
//It inoveks the destroy Method.
		
		
		applicationContext.close();
	}

}
