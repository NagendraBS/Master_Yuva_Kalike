package com.yuvalearning.department_service.service.impl;

import com.yuvalearning.department_service.dto.DepartmentDto;
import com.yuvalearning.department_service.entity.Department;
import com.yuvalearning.department_service.repository.DepartmentRepository;
import com.yuvalearning.department_service.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@AllArgsConstructor  // Using Constructor Based Dependency Injection for DepartmentRepository
public class DepartmentServiceImpl  implements DepartmentService {

   private DepartmentRepository departmentRepository;


    @Override
    public DepartmentDto saveDepartment(DepartmentDto departmentDto) {

        // Convert Department Dto into Department JPA Entity

        Department department = new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription(),
                departmentDto.getDepartmentCode());

        Department savedDepartment = departmentRepository.save(department);

       DepartmentDto savedDepartmentDto = new DepartmentDto(
               savedDepartment.getId(),
               savedDepartment.getDepartmentName(),
               savedDepartment.getDepartmentDescription(),
               savedDepartment.getDepartmentCode()
       );

        return savedDepartmentDto;
    }

    @Override
    public DepartmentDto getDepartmentByCode(String departmentCode) {
           Department department =  departmentRepository.findByDepartmentCode(departmentCode);

           DepartmentDto departmentDto = new DepartmentDto(
                   department.getId(),
                   department.getDepartmentName(),
                   department.getDepartmentDescription(),
                   department.getDepartmentCode()
           );

        return departmentDto;
    }

}
