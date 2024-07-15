package com.springcore.ConstructorDependencyInjection.javaCollections.Map;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class Test {

	public static void main(String[] args) {

		//creataing a Classpath resource
		Resource resource = new ClassPathResource("com/springcore/ConstructorDependencyInjection/javaCollections/Map/appcontext.xml");
		
		BeanFactory factory = new XmlBeanFactory(resource);
		
		Company comp = (Company) factory.getBean("company");
		
		comp.show();
	}

}
