package com.example.springboot.learn_jpa_and_hibernate.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.springboot.learn_jpa_and_hibernate.course.springdatajpa.CourseSpringDataJpaRepository;


@Component
public class CourseCommandLineRunner implements CommandLineRunner {

//	@Autowired
//	private CourseJdbcRepository repository;
	
//	@Autowired
//	private  CourseJpaRepository repository;
	
	@Autowired
	private CourseSpringDataJpaRepository repository;
	
	
	@Override
	public void run(String... args) throws Exception {

//		repository.insert(new Course(1, "Learn Spring Boot", "Neha"));
//        repository.insert(new Course(2, "Learn Java", "Yuvaraj"));
//        repository.insert(new Course(3, "AWS Fundamentals", "Raksha"));
        
		
		
		repository.save(new Course(0, "Learn Spring Boot", "Neha"));
        repository.save(new Course(0, "Learn Java", "Yuvaraj"));
        repository.save(new Course(0, "AWS Fundamentals", "Raksha"));
        
        repository.deleteById(1l);
        
        System.out.println(repository.findById(2l));
        System.out.println(repository.findById(3l));
        
        
        System.out.println(repository.findAll());
        
        System.out.println(repository.findByAuthor("Neha"));
        
        
	}

	
	
	
}
