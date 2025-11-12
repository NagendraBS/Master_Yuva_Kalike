package com.example.springboot.learn_jpa_and_hibernate.course.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.springboot.learn_jpa_and_hibernate.course.Course;


@Repository
public class CourseJdbcRepository {

	@Autowired
	private JdbcTemplate springJdbcTemplate;
	
	private static String INSERT_QUERY = 
			
			"""

		    INSERT INTO course (id, name, author)
		    VALUES (?,?,?);
		    """;
		
	private static String DELETE_QUERY = 
			
			"""
			delete from course  
			where id = ?
			""" ;
	
	private static String SELECT_QUERY = 
			
			"""
			select * from course
			where id = ?
			""";
	


	public void insert(Course course) {
		springJdbcTemplate.update(INSERT_QUERY,course.getId(),
	            course.getName(),
	            course.getAuthor());
		
	}
	
	
	public void deleteById(int id) {
		
		springJdbcTemplate.update(DELETE_QUERY, id);
	}
	
	
//	public Course findById(long id) {
//		springJdbcTemplate.queryForObject(SELECT_QUERY, null, id); 
//	}
	
}
 	