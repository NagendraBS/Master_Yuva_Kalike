package com.springcore.Autowiring.byName;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {

	public static void main(String[] args) {

		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:com/springcore/Autowiring/byName/autoConfig.xml");
		
// If we need not to do type Caste With (Emp) in Below Line
// We Can give it as  ("emp1", Emp.class)  instead of ("emp")
	 	Emp ep = context.getBean("emp1", Emp.class);
		
	 	System.out.println(ep);
	 	
		
	}

}
