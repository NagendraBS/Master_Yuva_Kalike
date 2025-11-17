package com.yuvalearning.springboot.service;

import com.yuvalearning.springboot.dto.UserDto;
import com.yuvalearning.springboot.entity.User;

import java.util.List;

public interface UserService {

    // DTO Usage -   User --->  UserDto
    // Change the Class Type in the Service Impl as well for the Same method

    UserDto createUser(UserDto user);

    User getUserById(Long userId);

    List<User> getAllUsers();

    User updateUser(User user);

    void deleteUser(Long user);
}
