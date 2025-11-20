package com.yuvalearning.employee_service.dto;

 // Synchronous Comminication Between the Microservices
 // 2. Create, DepartmentDto Class to Hold the Department Information.

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {

    private Long id;
    private String departmentName;
    private String departmentDescription;
    private String departmentCode;


}
