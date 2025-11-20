package com.yuvalearning.employee_service.service;

import com.yuvalearning.employee_service.dto.APIResponseDto;
import com.yuvalearning.employee_service.dto.EmployeeDto;

public interface EmployeeService {

    EmployeeDto saveEmployee(EmployeeDto employeeDto);


//   EmployeeDto getEmployeeById(Long employeeId);

    // Since The Return Tyoe Of his Method Chnages to APIResponseEntity,
    // Changing The type of The Method Here As well
    APIResponseDto getEmployeeById(Long employeeId);

}
