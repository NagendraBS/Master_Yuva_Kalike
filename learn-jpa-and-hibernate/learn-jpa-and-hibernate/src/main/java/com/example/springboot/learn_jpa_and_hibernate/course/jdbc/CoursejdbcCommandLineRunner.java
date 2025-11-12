package com.example.springboot.learn_jpa_and_hibernate.course.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.springboot.learn_jpa_and_hibernate.course.Course;


@Component
public class CoursejdbcCommandLineRunner implements CommandLineRunner {

	@Autowired
	private CourseJdbcRepository repository;

	
	@Override
	public void run(String... args) throws Exception {

		repository.insert(new Course(1, "Learn Spring Boot", "Neha"));
        repository.insert(new Course(2, "Learn Java", "Yuvaraj"));
        repository.insert(new Course(3, "AWS Fundamentals", "Raksha"));
        
        repository.deleteById(1);
        
//        System.out.println(repository.findById(3));
        
	}

	
	
	
}
