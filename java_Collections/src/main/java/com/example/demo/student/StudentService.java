package com.example.demo.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

	
	public static List<Student> getStudents() {
		return List.of(new Student(1L, "Yogendra B S", "Nag2000@gmail.com", LocalDate.of(2000, Month.OCTOBER, 4), 23

		)

		);
	}
}
