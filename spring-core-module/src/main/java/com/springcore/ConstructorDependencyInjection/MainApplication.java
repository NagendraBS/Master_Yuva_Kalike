package com.springcore.ConstructorDependencyInjection;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class MainApplication {

	public static void main(String[] args)
	 {
	     // Creating a class path resource
	     Resource resource = new ClassPathResource(
	         "com/springcore/ConstructorDependencyInjection/config.xml");

	     // Creating an object of BeanFactory class
	     BeanFactory factory = new XmlBeanFactory(resource);

	     // Creating an object of Employee class
	       Company c = (Company)factory.getBean("company");

	     // Calling print() method inside main() method
	     c.display();
	 }

}
