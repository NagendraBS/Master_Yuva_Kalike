package com.springcore.propertySource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:discounts.properties")
@ComponentScan("com.springcore.propertySource")
public class ShoppingCategoryConfig {

	@Value("${specialcustomer.discount:0}")
	private int specialCustomerDiscount;
	
	@Value("${summer.discount:0}")
	private int specialSummerDiscount;
	
	@Value("${product.discount:0}")
	private int productDiscount;
	
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
		
		return new PropertySourcesPlaceholderConfigurer();
	}
	
	//Products 
	
	@Bean
	public Product asus() {
		
	Product d1 = new Product("ASUS", 6500, specialSummerDiscount);
	return d1;
	
	}
	
	@Bean
	public Product hp() {
		
		Product d1 = new Product("HP", 70000, specialSummerDiscount);
		return d1;
	}
	
	@Bean
	public Product redmi() {
		
		Product d1 = new Product("REDMI", 57000, productDiscount);
		 return d1;
	}
	
	
	@Bean
	public Product oneplus() {
		Product d1 = new Product("ONEPLUS", 55000, specialSummerDiscount);
		return d1;
	}
	
	@Bean
	public Product samsung() {
		Product d1 = new Product("SAMSUNG", 62000, specialCustomerDiscount);
		return d1;
	}
	
	
	
	
}



