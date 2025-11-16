package com.yuvalearning.springboot.repository;

import com.yuvalearning.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {


}
