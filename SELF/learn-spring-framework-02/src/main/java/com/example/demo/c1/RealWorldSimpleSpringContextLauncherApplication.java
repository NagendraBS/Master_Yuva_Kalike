package com.example.demo.c1;

import java.util.Arrays;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import ch.qos.logback.core.net.SyslogOutputStream;

@Configuration
@ComponentScan
public class RealWorldSimpleSpringContextLauncherApplication {



	public static void main(String[] args) {


		try {
			var context = new AnnotationConfigApplicationContext
					(RealWorldSimpleSpringContextLauncherApplication.class);

			Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
			
			
			
			System.out.println(context.getBean(BusinessCalculationService.class).findMax());
			
			
			
					} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
