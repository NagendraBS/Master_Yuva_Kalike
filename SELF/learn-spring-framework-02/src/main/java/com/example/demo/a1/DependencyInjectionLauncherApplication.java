package com.example.demo.a1;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import ch.qos.logback.core.net.SyslogOutputStream;

@Component
class YourBusinessClass {

	// Filed Injection
//Injecting Depedencies into this Class

	Dependency1 dependency1;

	Dependency2 dependency2;

	
	//Setter based Injection Dependencies
	
//	@Autowired
//	public void setDependency1(Dependency1 dependency1) {
//		System.out.println("Setter Injection - SetDependency1");
//		this.dependency1 = dependency1;
//	}
//
//	
//	@Autowired
//	public void setDependency2(Dependency2 dependency2) {
//		System.out.println("Setter Injection - SetDependency2");
//
//		this.dependency2 = dependency2;
//	}

	
	// Constructor Based Injection Dependency
	//@Autowired is Not Mandatory here, Spring Will Automatically Take Annotation
	
	
//	@Autowired
	public YourBusinessClass(Dependency1 dependency1, Dependency2 dependency2) {
		super();
		System.out.println("Constructor Injection - your business Class");
			
		this.dependency1 = dependency1;
		this.dependency2 = dependency2;
	}
	
	
	
	public String toString() {
		return "Using" + dependency1 + "and" + dependency2;
	}



}

@Component
class Dependency1 {

}

@Component
class Dependency2 {

}

@Configuration
@ComponentScan
public class DependencyInjectionLauncherApplication {

	public static void main(String[] args) {

		try {
			var context = new AnnotationConfigApplicationContext(DependencyInjectionLauncherApplication.class);

			Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);

			System.out.println(context.getBean(YourBusinessClass.class));

		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
