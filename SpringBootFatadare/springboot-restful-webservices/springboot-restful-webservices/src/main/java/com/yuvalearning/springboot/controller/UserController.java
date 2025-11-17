package com.yuvalearning.springboot.controller;

import com.yuvalearning.springboot.dto.UserDto;
import com.yuvalearning.springboot.entity.User;
import com.yuvalearning.springboot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// DTO - 2. Refactor the createUser REST API to use DTO  (ResponseEntity<User> --> ResponseEntity<UserDto>)

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    //Build Create User REST API

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto user){   // @RequestBody - > Converts JSON into java Object
       UserDto savedUser =  userService.createUser(user);
       return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    //Build get user by Id
    //http:/localhost:8080/api/users/1

    @GetMapping("{id}")
    public ResponseEntity<User> getuserById(@PathVariable("id") Long userId){
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //Build get All Users REST API
    //http:/localhost:8080/api/users

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
     List<User> users = userService.getAllUsers();
     return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //Build Update User RESt API
    //http:/localhost:8080/api/users/2

    @PutMapping("{id}")
    public ResponseEntity<User> updateUser( @PathVariable("id") Long userId ,
                                            @RequestBody User user){
        user.setId(userId);
       User updatedUser = userService.updateUser(user);
       return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


    //Build delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>("User Sucessfully Deleted !" , HttpStatus.OK);
    }

}
