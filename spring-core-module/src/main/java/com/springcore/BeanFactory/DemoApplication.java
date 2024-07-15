package com.springcore.BeanFactory;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DemoApplication {

	public static void main(String[] args) {

		BeanFactory factory = new ClassPathXmlApplicationContext("com/springcore/BeanFactory/beans.xml");
		
		Student student = (Student)factory.getBean("student");
		
		System.out.println(student);
	}

}
