package com.mvn.crud_operations_demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.mvn.crud_operations_demo.model.Books;
import com.mvn.crud_operations_demo.repository.BooksRepository;
//repository that extends CrudRepository

public interface BooksRepository extends CrudRepository<Books, Integer>{

}
