package com.example.demo.c1;

import javax.xml.crypto.Data;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class MySQLDataService implements DataService{

	@Override
	public int[] retriveData() {

		return new int[] {1,2,3,4,5};
	}

	
}
