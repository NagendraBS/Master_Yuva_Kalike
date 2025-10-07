package com.example.demo.HelloWorld;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

record Person (String name, int age)
{
	
};

//Address firstline & City
record Address(String firstline, String city) {
	
};


@Configuration
public class HelloWorldConfiguration {
	
	@Bean
	public String name() {
	 return "Nagendra"; 
    }
	
	@Bean
	public int age() {
		return 25;
	}
	
	@Bean
	public Person person() {
		return new Person("Yuvaraj",26);
	}
	
	
	@Bean
	public Person person2MethodCall() {
		return new Person(name(),age()); 
	}
	
	
	@Bean(name="address2")
	public Address address() {
		
	return	new Address("LIG-29, KHB Colony,Bommanakatte" , "Bhadravathi");
	}
	
	
}