package com.yuvalearning.springboot.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
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

    // user firstName should not be NUL or Empty
    @NotEmpty(message = "User firstName Should Not be NULL or EMPTY !")
    private String firstName;

    // user lastName should not be NUL or Empty

    @NotEmpty(message = "User lastName Should Not be NULL or EMPTY !")
    private String lastName;

    // user Email should not be NUL or Empty
    @NotEmpty(message = "User Email Should Not be NULL or EMPTY !")
    @Email(message = "User Email address Should be Valid !")
    private String email;


}
