package com.example.demo.d1;

import java.util.Arrays;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import ch.qos.logback.core.net.SyslogOutputStream;


@Component
class ClassA{
	
}

@Component
@Lazy
class ClassB {
	
	private ClassA classA;
	
	public ClassB(ClassA classA) {
		
		System.out.println(" Some Initialization  Logic");
		this.classA = classA ;
	}
	
	
	public void doSomething() {
		System.out.println("Iam ClassB Bean");
	}
}	



@Configuration
@ComponentScan
public class LazyInitializationLauncherApplication {

	public static void main(String[] args) {


		try {
			var context = new AnnotationConfigApplicationContext
					(LazyInitializationLauncherApplication.class);

				System.out.println("Initilization of Context is Completed");
				
				context.getBean(ClassB.class).doSomething();;

				
			
					} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
