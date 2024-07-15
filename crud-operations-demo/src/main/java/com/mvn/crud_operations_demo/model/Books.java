package com.mvn.crud_operations_demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Mark Class as An Entity
@Entity
//Defining Class name as TableName
@Table
public class Books {

	
	//Member Variables
	@Id
	@Column
	private int bookid;
	@Column
	private String bookname;
	@Column
	private String author;
	@Column
	private String price;

	
	
	// Getters and Setters
	
	
	public int getBookid() {
		return bookid;
	}

	public void setBookid(int bookid) {
		this.bookid = bookid;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}
	
	
	
	
	
	
	
	
}
