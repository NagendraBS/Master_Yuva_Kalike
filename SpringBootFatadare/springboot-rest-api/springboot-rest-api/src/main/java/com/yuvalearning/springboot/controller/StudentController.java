package com.yuvalearning.springboot.controller;


import com.yuvalearning.springboot.bean.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Struct;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

    //http://localhost:8080/student

    @GetMapping("Student")
    public ResponseEntity<Student> getStudent(){

        Student student = new Student(1,"Nagendra", "Murthy");
        return new ResponseEntity<>(student, HttpStatus.OK);
//        return ResponseEntity.ok(student);
//        return ResponseEntity.ok().header("custom-header", "Nagendra").body(student);
        // Above line 22 Contains -  (The instance of the ResponseEntity (Student type), HTTP Status)
    }

    //http://localhost:8080/students

    //@GetMapping("students")
    @GetMapping
    public ResponseEntity<List<Student>> listofStudent(){
        List<Student> students = new ArrayList<>();

        students.add(new Student(1, "Yuvaraj", "Achar"));
        students.add(new Student(2, "Srinivasa", "Murthy"));
        students.add(new Student(3, "Kalavathi", "Achar"));
        students.add(new Student(4, "Nagendra", "Srini"));

        return ResponseEntity.ok(students);
    }


    //Spring Boot REST API with @pathVariable
    // {id} - URI template variable

// When we want to bind the URI template variable (id here) to the method argument,use @PathVariable

    //http://localhost:8080/students/1/Yuvaraj/Murthy

//    @GetMapping("students/{id}/{firstName}/{lastName}")
    @GetMapping("{id}/{firstName}/{lastName}")
    public ResponseEntity<Student>  studentPathVariable(@PathVariable("id") int studentId,
                                       @PathVariable String firstName,
                                       @PathVariable String lastName){
        Student student = new Student(studentId ,firstName, lastName);
        return ResponseEntity.ok(student);

    }



    // SpringBoot RESt APi with @RequestParm


    //http://localhost:8080/students/query?id=1

//    @GetMapping("students/query")
    @GetMapping("/query")
    public  ResponseEntity<Student> studentRequestVariable(@RequestParam int id){

        Student student = new Student(id, "Nagendra" , "Acharya");

        return ResponseEntity.ok(student);
    }


    //http://localhost:8080/students/querys?id=1&firstName=Nag&lastname=Murthy

//    @GetMapping("students/querys")
    @GetMapping("/querys")
    public ResponseEntity<Student> studentRequestVariable(@RequestParam int id,
                                          @RequestParam String firstName,
                                          @RequestParam String lastname){
    Student student = new Student(id, firstName , lastname);

        return ResponseEntity.ok(student);
    }




    // SpringBoot REST API that Handles HTTP POST request - Creating New Resource

    // @PostMapping  and @RequestBody
    //http://localhost:8080/students/create

//    @PostMapping("students/create")
    @PostMapping("/create")
    //@ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        System.out.println(student.getId());
        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());
        return  new ResponseEntity<>(student, HttpStatus.CREATED);
    }


    // StringBoot REST API handles HTTP PUT request - Updating existing resource

    //http://localhost:8080/students/3/update

//    @PutMapping("students/{id}/update")
    @PutMapping("{id}/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student, @PathVariable int id){

        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());
        return ResponseEntity.ok(student);
    }


    //SpringBoot REST API handles HTTP DELETE Request - Deleteing the Existing Resource

    //http://localhost:8080/students/{id}/delete

//    @DeleteMapping("students/{id}/delete")
    @DeleteMapping("{id}/delete")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") int studentId){

        System.out.println(studentId);
        return ResponseEntity.ok("Student Deleted Successfully" );

    }






}
