package com.springcore.SetterDependencyInjection.dependentObject;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class Test {

	public static void main(String[] args) {

		Resource res = new ClassPathResource("com/springcore/SetterDependencyInjection/dependentObject/Config1.xml");

		BeanFactory fac = new XmlBeanFactory(res);

		Employee emp = (Employee) fac.getBean("obj");

		System.out.println(emp);

	}

}
