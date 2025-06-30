package com.java.interview;

import java.time.LocalDate;

public class Student {

		
		String studentName;
		
		int age ;
		
		LocalDate dateOfJoining;


		public Student(String studentName, int age, LocalDate dateOfJoining) {
			super();
			this.studentName = studentName;
			this.age = age;
			this.dateOfJoining = dateOfJoining;
		}


		public String getStudentName() {
			return studentName;
		}


		public void setStudentName(String studentName) {
			this.studentName = studentName;
		}


		public int getAge() {
			return age;
		}


		public void setAge(int age) {
			this.age = age;
		}


		public LocalDate getDateOfJoining() {
			return dateOfJoining;
		}


		public void setDateOfJoining(LocalDate dateOfJoining) {
			this.dateOfJoining = dateOfJoining;
		}


		@Override
		public String toString() {
			return "studentName=" + studentName  + ",  " + "dateOfJoining=" + dateOfJoining ;
		}
		

		
	}


