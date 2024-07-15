package com.mvn.crud_operations_demo.service;

import java.util.*;
import org.hibernate.service.JavaServiceLoadable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mvn.crud_operations_demo.model.Books;
import com.mvn.crud_operations_demo.repository.BooksRepository;

//Defining Business Logics Here

@Service
public class BooksService {

	@Autowired
	BooksRepository booksRepository;

//getting all books record by using the method findAll() of CRUD Repository

	public List<Books> getAllBooks() {
		List<Books> books = new ArrayList<Books>();
		booksRepository.findAll().forEach(books1 -> books.add((Books) books1));
		return books;

	}

//getting a specific record by using the method findById() of CrudRepository 

	public Books getBooksById(int id) {
		return (Books) booksRepository.findById(id).get();

	}

//saving a specific record by using the method save() of CrudRepository 

	public void saveOrupdate(Books books) {
		booksRepository.save(books);
	}

//deleting a specific record by using the method deleteById() of CrudRepository	

	public void delete(int id) {
		booksRepository.deleteById(id);
	}

//updating a record	

	public void update(Books books, int bookid) {
		booksRepository.save(books);
	}

}