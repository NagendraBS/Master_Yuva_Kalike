package com.example.springboot.learn_jpa_and_hibernate.course;

public class Course {

	private Long id;
	private String name;
	private String author;
	
	
	public Course () {
		
	}
	
	public Course(Long id, String name, String Author){
		this.id = id;
		this.name = name;
		this.author = author;
	}

	

	
	public Long getId() {
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
