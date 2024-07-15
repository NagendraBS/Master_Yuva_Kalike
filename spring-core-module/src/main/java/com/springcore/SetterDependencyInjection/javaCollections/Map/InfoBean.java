package com.springcore.SetterDependencyInjection.javaCollections.Map;

import java.util.Map;
import java.util.Map.Entry;

public class InfoBean {

	private String name;
	private String message;
	private  Map< String, String> frameworks;
	
	public InfoBean() {
		// TODO Auto-generated constructor stub
	}
	
	
	//Genetrated Getters and Setters
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Map<String, String> getFrameworks() {
		return frameworks;
	}
	public void setFrameworks(Map<String, String> frameworks) {
		this.frameworks = frameworks;
	}
	
	
	public void display() {
		
		System.out.println("Hi, I am" + name + ", " + message);
		
		System.out.println("Frameworks Names :  Description");
		
		for(Entry<String, String>  entry : frameworks.entrySet()){
			
			System.out.println(entry.getKey()+ " : " + entry.getValue());
			
		}
		
	}
	
		
	}
	
