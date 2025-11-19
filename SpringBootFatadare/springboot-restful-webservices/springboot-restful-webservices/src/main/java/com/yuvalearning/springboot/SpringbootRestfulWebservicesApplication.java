package com.yuvalearning.springboot;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@OpenAPIDefinition(
       info =  @Info(
                title = "SpringBoot REST API Documentation",
                description = "SpringBoot REST API Documentation",
                contact = @Contact(
                        name="Nagendra",
                        email = "Nag@gamil.com",
                        url = "https://www.geeksforgeeks.org"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.geeksforgeeks.org/license"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "SpringBoot User Management Documentation",
                url = "https://www.geeksforgeeks.org/user-managemnet.html"
        )

)
public class SpringbootRestfulWebservicesApplication {
    // Configure ModelMapperClass as Spring Bean
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

	public static void main(String[] args) {
		SpringApplication.run(SpringbootRestfulWebservicesApplication.class, args);
	}

}
