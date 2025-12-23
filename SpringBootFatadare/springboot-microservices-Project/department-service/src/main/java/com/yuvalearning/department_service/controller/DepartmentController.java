package com.yuvalearning.department_service.controller;

import com.yuvalearning.department_service.dto.DepartmentDto;
import com.yuvalearning.department_service.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.apache.catalina.loader.ResourceEntry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ResourceBundle;

@RestController
@RequestMapping("api/departments")
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;

    //Build save department REST API

    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment (@RequestBody DepartmentDto departmentDto){
       DepartmentDto savedDepartment =  departmentService.saveDepartment(departmentDto);
       return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);

    }



    //Build Get Department REST API By DepartmentCode
    @GetMapping("{department-code}")
    public ResponseEntity<DepartmentDto> getDepartmentByCode (@PathVariable ("department-code") String departmentCode){

        DepartmentDto deapartmentById = departmentService.getDepartmentByCode(departmentCode);
        return  new ResponseEntity<>(deapartmentById, HttpStatus.OK);

    }


}
