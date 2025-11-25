package com.yuvalearning.employee_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class EmployeeServiceApplication {

    // Synchronous Comminication Between the Microservices


    // 3.Configure REST template as Spring Bean
//    @Bean
//    public RestTemplate restTemplate(){
//        return new RestTemplate();
//    }

    // Configure WebClient Template as Spring Bean
    @Bean
    public WebClient webClient(){
        return WebClient.builder().build();
    }

	public static void main(String[] args) {
		SpringApplication.run(EmployeeServiceApplication.class, args);
	}


}
