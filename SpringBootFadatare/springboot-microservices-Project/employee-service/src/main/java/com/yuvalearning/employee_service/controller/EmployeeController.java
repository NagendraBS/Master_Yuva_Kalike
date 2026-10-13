package com.yuvalearning.employee_service.controller;


import com.yuvalearning.employee_service.dto.APIResponseDto;
import com.yuvalearning.employee_service.dto.EmployeeDto;
import com.yuvalearning.employee_service.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/employees")
@AllArgsConstructor
public class EmployeeController {

    private EmployeeService employeeService;

    //Bulid Save Employee REST API

    @PostMapping()
    public ResponseEntity<EmployeeDto> createEmployee (@RequestBody EmployeeDto employeeDto){

       EmployeeDto savedEmployee = employeeService.saveEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }


    // Build Get Employee   REST API


//    @GetMapping("{id}")
//    public ResponseEntity<EmployeeDto> getEmployeeByID(@PathVariable ("id")  @RequestBody Long employeeId){
//       EmployeeDto employeeDto =  employeeService.getEmployeeById(employeeId);
//        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
//    }


    // Build Get Employee   REST API
    // Synchronous Comminication Between the Microservices
    // Changing the employeeDto type  to APIResponseDto Type

    @GetMapping("{id}")
    public ResponseEntity<APIResponseDto> getEmployeeByID(@PathVariable("id")  @RequestBody Long employeeId){
        APIResponseDto apiResponseDto =  employeeService.getEmployeeById(employeeId);
        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }

}
