package com.yuvalearning.springboot.controller;

import com.yuvalearning.springboot.dto.UserDto;
import com.yuvalearning.springboot.entity.User;
import com.yuvalearning.springboot.exception.ErrorDetails;
import com.yuvalearning.springboot.exception.ResourceNotFoundException;
import com.yuvalearning.springboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;


// DTO - 2. Refactor the createUser REST API to use DTO  (ResponseEntity<User> --> ResponseEntity<UserDto>)


@Tag(
        name = "CRUD REST API for user Resource",
        description = "CRUD REST API's - Create User, Update User, Get user, Get All Users, Delete User"
)
@RestController
@AllArgsConstructor
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    //Build Create User REST API

    @Operation(
            summary =  "Create USer REST API",
            description = "Create User REST API is used to s    ave user in a Database"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 Created"
    )
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto user){   // @RequestBody - > Converts JSON into java Object
       UserDto savedUser =  userService.createUser(user);
       return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    //Build get user by Id
    //http:/localhost:8080/api/users/1

    @Operation(
            summary =  "get User By ID REST API",
            description = "get User By ID REST API is used to get the user from the Database"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getuserById(@PathVariable("id") Long userId){
        UserDto user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //Build get All Users REST API
    //http:/localhost:8080/api/users

    @Operation(
            summary =  "get All Users REST API",
            description = "get All Users REST API from the Database"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
     List<UserDto> users = userService.getAllUsers();
     return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //Build Update User RESt API
    //http:/localhost:8080/api/users/2

    @Operation(
            summary =  "Update User REST API",
            description = "Update User REST API is used to Update particular userin the Database"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser( @PathVariable("id") Long userId ,
                                          @Valid  @RequestBody UserDto user){
        user.setId(userId);
       UserDto updatedUser = userService.updateUser(user);
       return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @Operation(
            summary =  "Delete Users REST API",
            description = "Delete User REST API used to delete the User from the Database"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )

    //Build delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>("User Sucessfully Deleted !" , HttpStatus.OK);
    }

// Handling Specific Exception  Wrt  Controller Class

    // Commenting  Below Code, Since It has been moved to Global Exception Handling.


//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception,
//                                                                        WebRequest webRequest)
//    {
//
//        ErrorDetails errorDetails = new ErrorDetails(
//                LocalDateTime.now(),
//                exception.getMessage(),
//                webRequest.getDescription(false),
//                "USER_NOT_FOUND"
//
//        );
//
//        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
//    }

}
