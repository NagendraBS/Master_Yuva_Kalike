package com.mvn.core.spring;

// Java Program to Illustrate Mobile Class
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

//Class
public class Mobile {

	// Main driver method
	public static void main(String[] args)
	{

		// Using ApplicationContext tom implement Spring IoC
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/mvn/core/spring/beans.xml");
         
        // Get the bean
        Sim sim = applicationContext.getBean("sim", Sim.class);
        Sim sim1 = applicationContext.getBean("sim", Sim.class);
         
        // Calling the methods
        sim.calling("sim1");
        sim.data();
        System.out.println(sim.hashCode());
        
        sim1.calling("sim2");
        sim1.data();
        System.out.println(sim1.hashCode());
	}
}
