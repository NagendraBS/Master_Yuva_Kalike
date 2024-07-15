package com.example.demo.f1;

import java.util.Arrays;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import ch.qos.logback.core.net.SyslogOutputStream;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Component
class SomeClass{
	
	private SomeDependency someDependency;
	
	public SomeClass(SomeDependency someDependency) {
		super();
		System.out.println("All Dependencies are Ready");
		this.someDependency = someDependency;
	}
	
	@PostConstruct
	public void Initialize() {
		
		someDependency.getReady();
		
	}

	@PreDestroy
	public void cleanUp(){
		System.out.println("CleanUp");
	}
	
}


@Component
class SomeDependency{

	public void getReady() {

		System.out.println("Some Logic using Some Dependencies");
	}
	
	
}



@Configuration
@ComponentScan
public class PrePostAnnotationContextLauncherApplication {



	public static void main(String[] args) {


		try {
			var context = new AnnotationConfigApplicationContext
					(PrePostAnnotationContextLauncherApplication.class);

			Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
			
					} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
