package com.springcore.SetterDependencyInjection;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDI {

	public static void main(String[] args) {

		ApplicationContext context = new ClassPathXmlApplicationContext("com/springcore/SetterDependencyInjection/Config.xml");
		
		Student student = (Student) context.getBean("yuva");
		
		System.out.println(student);
	}

}
