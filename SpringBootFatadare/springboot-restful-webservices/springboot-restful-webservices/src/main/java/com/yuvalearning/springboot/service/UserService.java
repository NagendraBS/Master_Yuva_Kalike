package com.yuvalearning.springboot.service;

import com.yuvalearning.springboot.entity.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    User getUserById(Long userId);

    List<User> getAllUsers();

    User updateUser(User user);

    void deleteUser(Long user);
}
