package com.example.springboot.learn_spring_boot;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//  @RestController = @Controller + @ResponseBody ,  So Here If we are using  @RestController, then we 
//   No Need of using @ResponseBody annotation, Eventhough we are using @RestController,
// we have to Use @RequestMapping 




//@Controller
@RestController
public class CourseController {

//  /courses
// Course :id, name, author

	@RequestMapping("/courses")
	//@ResponseBoady
	public List<Course> retriveAllCourses() {

		return Arrays.asList(
				new Course(1, "Learn AWS", "in28minutes"), 
				new Course(2, "Learn DevOps", "in28minutes"),
				new Course(3, "Learn SpringBoot", "Nagendra"),
				new Course(4, "Learn Azure", "Yuvaraj")


// The list of data is Converted in to JSON format in the Website,
// that is Because of Use of "JacksonHttpMessageConvertersConfiguration".
			
				
		);

	}

}
