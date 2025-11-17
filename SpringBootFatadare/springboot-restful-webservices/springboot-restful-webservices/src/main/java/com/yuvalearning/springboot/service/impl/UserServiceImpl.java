package com.yuvalearning.springboot.service.impl;

import com.yuvalearning.springboot.dto.UserDto;
import com.yuvalearning.springboot.entity.User;
import com.yuvalearning.springboot.exception.ResourceNotFoundException;
import com.yuvalearning.springboot.mapper.UserMapper;
import com.yuvalearning.springboot.repository.UserRepository;
import com.yuvalearning.springboot.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private ModelMapper modelMapper;

    // DTO -  Refactoring the createUser Method in the serviceImpl

    @Override
    public UserDto createUser(UserDto userDto) {
        //above line Converted from User --> UserDto
        // Now , we Need to Store the [JPA entity Object] to the database.
        // So, Convert the UserDto Object --> User JPA entity Object -->
        // Pass,  User JPA entity Object  -->  createUser() Method

        // Convert the UserDto Object --> User JPA entity Object
//            User user = UserMapper.mapToUser(userDto);

        User user = modelMapper.map(userDto, User.class);

//        User user = new User(
//                userDto.getId(),
//                userDto.getFirstName(),
//                userDto.getLastName(),
//                userDto.getEmail()
//        );


        //pass the Converted [UserJpa Object] to the save() method here
       User savedUser =  userRepository.save(user);  // Main Saving logic

       // Convert the [UserJpa Entity] to [UserDto Object]
//        UserDto savedUserDto = UserMapper.mapTouserDto(savedUser);

        UserDto savedUserDto = modelMapper.map(savedUser, UserDto.class);


//        UserDto savedUserDto = new UserDto(
//                savedUser.getId(),
//                savedUser.getFirstName(),
//                savedUser.getLastName(),
//                savedUser.getEmail()
//        );


        // Need to return [UserDto Object]
         return savedUserDto;     // Returning Logic in UserDto Object

    }

    @Override
    public UserDto getUserById(Long userId) {
        User user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "Id" , userId)

        );
//        User user = optionalUser.get();
//        return UserMapper.mapTouserDto(user);
        return modelMapper.map(user, UserDto.class);

    }


    @Override
    public List<UserDto> getAllUsers() {
       List<User> users = userRepository.findAll();
//        return  users.stream().map(user -> UserMapper.mapTouserDto(user))
//                .collect(Collectors.toList());

        return  users.stream().map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(UserDto user) {
        // For Updating The user we are getting the user by Id from the Database table (userRepository)
      User existingUser = userRepository.findById(user.getId()).orElseThrow(
              () -> new ResourceNotFoundException("User", "Id", user.getId())
      );
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());

        //After Updating The Parameters we are saving the updated existing user to the Database table (using UserRepository)
        User updatedUser = userRepository.save(existingUser);

//        return UserMapper.mapTouserDto(updatedUser);

            return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(Long userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "Id", userId)
        );

       userRepository.deleteById(userId);
    }

}
