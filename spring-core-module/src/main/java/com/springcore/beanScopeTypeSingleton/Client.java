package com.springcore.beanScopeTypeSingleton;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

// Client Class Need to Request for the defined bean in xml File

public class Client {

	
	public static void main(String[] args) {

		
// Load the Spring XML Configuration file into the IOC Container
		ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:com/springcore/beanScopeTypeSingleton/spring.xml");
		
		
// Get the "HelloWorld" bean object and Call getName() method
		HelloWorld hello1 = (HelloWorld) ac.getBean("hw");
		
// Set the name 
		hello1.setName("Yuvaraj");
		
		
		System.out.println("Hello Object of HelloWorld (hello1) : " + "Your Name is - "+ hello1.getName());
		
		
		
		
//Get another HelloWorld bean Object and Call getName method()	
		HelloWorld hello2 =(HelloWorld) ac.getBean("hw");
		
		
		System.out.println("Hello Object of HelloWorld (hello2) : " + "Your Name is - "+ hello2.getName());
		
		
// Now Compare the references to see weather they are pointing to the Same object or Different object		
		
		 System.out.println(
		            "'hello1' and 'hello2'"
		            + " are referring"
		            + " to the same object: "
		            + (hello1 == hello2));
		
// For our Verfication Printing the Address(HashCode) of the both Object hello1 and hello2		
		 System.out.println("Addres of hello1 : " + hello1);
		 
		 System.out.println("Addres of hello2 : " + hello2);

		 
		
	}

}
