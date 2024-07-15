package com.springcore.SetterDependencyInjection.javaCollections.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class InfoBeanTest {

	public static void main(String[] args) {

		ApplicationContext context = new ClassPathXmlApplicationContext("com/springcore/SetterDependencyInjection/javaCollections/Map/applicationContext.xml");
		
		InfoBean info = (InfoBean) context.getBean("infobean");
		
		info.display();
		
	}

}
