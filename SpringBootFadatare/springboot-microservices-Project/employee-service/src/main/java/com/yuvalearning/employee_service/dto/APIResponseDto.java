package com.yuvalearning.employee_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Synchronous Comminication Between the Microservices
// Here We Need ot Send Back the "departmentDto" Back to the Client   with "EmployeeDto"
// So, We Need to Create one More Dto Class Called "APIResponseDto".


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class APIResponseDto {

    private EmployeeDto employeeDto;

    private DepartmentDto departmentDto;

}
