package com.springcore.propertySource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ShoppingCategory {

	private List<Product> items = new ArrayList<Product>();
	
	public void addItem(Product item) {
		items.add(item);
	}
	
	public List<Product> getItems(){
		return items;
	}
}
