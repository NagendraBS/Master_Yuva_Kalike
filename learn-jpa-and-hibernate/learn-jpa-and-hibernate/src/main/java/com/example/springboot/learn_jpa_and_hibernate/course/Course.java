package com.example.springboot.learn_jpa_and_hibernate.course;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String author;
	
	
	public Course () {
		
	}
	
	public Course(int id, String name, String author){
		this.id = id;
		this.name = name;
		this.author = author;
	}

	

	
	public int getId() {
		return id;
	}



	public String getName() {
		return name;
	}


	public String getAuthor() {
		return author;
	}


	@Override
	public String toString() {
		return "Course [id=" + id + ", name=" + name + ", author=" + author + "]";
	}
	
	
	
	
}
