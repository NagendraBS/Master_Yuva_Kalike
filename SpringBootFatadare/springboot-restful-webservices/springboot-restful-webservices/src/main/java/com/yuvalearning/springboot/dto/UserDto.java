package com.yuvalearning.springboot.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// DTO -  1. Create UserDto Class


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    // Don't include the sensitive Information inside the DTO Class

    private Long id;

    private String firstName;

    private String lastName;

    private String email;


}
