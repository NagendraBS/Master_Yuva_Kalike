package com.example.springboot.learn_jpa_and_hibernate.course.jpa;

import org.springframework.stereotype.Repository;

import com.example.springboot.learn_jpa_and_hibernate.course.Course;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class CourseJpaRepository {

	@PersistenceContext                         // we Can Use @Autowired  as well , But @PersistenceContext  More Specific One
	private EntityManager entityManager;
	
	public void insert(Course course) {
		entityManager.merge(course);
	}
	
	public Course findById(int id) {
		  return  entityManager.find(Course.class, id);
		
	}
	
	public void deleteById(int id) {
		
		Course course = entityManager.find(Course.class, id);
		entityManager.remove(course);
		
	}
	
}
 