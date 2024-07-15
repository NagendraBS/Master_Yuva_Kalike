package com.springcore.propertySource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

	public static void main(String[] args) {

		ApplicationContext context = new AnnotationConfigApplicationContext(ShoppingCategoryConfig.class );
		
		Product asus = context.getBean("asus", Product.class);
		Product redmi= context.getBean("redmi", Product.class);
		Product hp = context.getBean("hp" ,Product.class);
		Product oneplus = context.getBean("oneplus", Product.class);
		Product samsung = context.getBean("samsung", Product.class);
		
		
		
		ShoppingCategory laptops = context.getBean("shoppingCategory", ShoppingCategory.class);
		
		laptops.addItem(asus);
		laptops.addItem(redmi);
		laptops.addItem(hp);
		
		System.out.println("Category  :  Laptops");
		System.out.println(laptops.getItems());
		System.out.println("-------------------------------------");
		
		
		ShoppingCategory mobiles = context.getBean("shoppingCategory", ShoppingCategory.class);
		mobiles.addItem(oneplus);
		mobiles.addItem(samsung);
		
		System.out.println("Category  :  MobilePhones");
		System.out.println(mobiles.getItems());
		System.out.println("------------------------------------------------");
		
	}

}
