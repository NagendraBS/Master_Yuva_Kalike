package com.springcore.Autowiring.byType;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {

	public static void main(String[] args) {

		ApplicationContext context= new ClassPathXmlApplicationContext("classpath:com/springcore/Autowiring/byType/autoConfig.xml");
		
		Emp ep = context.getBean("emp2", Emp.class);
		
		System.out.println(ep);
	}

}
