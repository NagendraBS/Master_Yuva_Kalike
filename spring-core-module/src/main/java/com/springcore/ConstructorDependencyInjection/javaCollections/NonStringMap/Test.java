package com.springcore.ConstructorDependencyInjection.javaCollections.NonStringMap;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource; 

//Application Class
public class Test {

	
	public static void main(String[] args) {

		// Creating a class path resource 
        Resource resource = new ClassPathResource( 
            "com/springcore/ConstructorDependencyInjection/javaCollections/NonStringMap/configu.xml"); 
   
        // Creating an object of Beanfactory class 
        BeanFactory factory = new XmlBeanFactory(resource); 
	    
	 // Creating an object of Company class
	    Company c = (Company)factory.getBean("comp");
	    
	    c.display();
	}

}
