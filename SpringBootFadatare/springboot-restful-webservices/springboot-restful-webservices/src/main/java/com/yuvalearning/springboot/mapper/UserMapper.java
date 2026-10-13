package com.yuvalearning.springboot.mapper;

import com.yuvalearning.springboot.dto.UserDto;
import com.yuvalearning.springboot.entity.User;

public class UserMapper {

    // Convert the [UserJpa Entity] to [UserDto Object]
    public static UserDto mapTouserDto(User user){

        UserDto userDto = new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
        return userDto;

    }

    // Convert the [UserDto Object] to [UserJpa Entity]
    public static User mapToUser(UserDto userDto){

        User user = new User(
                userDto.getId(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getEmail()
        );

        return user;
    }


}
