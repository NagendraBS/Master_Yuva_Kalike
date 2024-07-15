package com.example.demo.HelloWorld;

import java.util.Arrays;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App01HelloWorldSpring {

	
	public static void main(String[] args) {
//1:Launch Spring Context -
		
	var context =
			new AnnotationConfigApplicationContext(HelloWorldConfiguration.class);
		
//2:Configure the things that we want Spring to Manage- 
//HelloWordConfiguration -@Configuration
//HelloWordConfiguration
//name -@Bean	
	
	
	
//3. Retriving the beans managed by Spring	
//		context.getBean("name");
		
		System.out.println(context.getBean("name"));
		
		System.out.println(context.getBean("age"));
		
		System.out.println(context.getBean("person"));
		
		//Retriving with Bean name
		System.out.println(context.getBean("address2"));
		
		//Retriving-Alternative Method
		System.out.println(context.getBean(Address.class));

		System.out.println(context.getBean("person2MethodCall"));
		
		//Q3.
//		Arrays.stream(context.getBeanDefinitionNames())
//		.forEach(System.out::println);
		
		
		
	} 

}
