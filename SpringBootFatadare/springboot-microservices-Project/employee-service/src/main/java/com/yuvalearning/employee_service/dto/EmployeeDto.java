package com.yuvalearning.employee_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;


    // Synchronous Comminication Between the Microservices
    // 1. Add , departmentCode Field in the Employee JPA Entity

    private  String departmentCode;

}
