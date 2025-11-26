package com.yuvalearning.employee_service.service;

import com.yuvalearning.employee_service.dto.DepartmentDto;
import lombok.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient (url = "http://localhost:8080", value = "DEPARTMENT-SERVICE")
public interface APIClient {

    // REST API Call Method
    //Build Get Department REST API By DepartmentCode

    @GetMapping("api/departments/{department-code}")  // Base URL "api/departments" "
    DepartmentDto getDepartmentByCode(@PathVariable("department-code") String departmentCode);



}
