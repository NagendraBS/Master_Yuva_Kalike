package com.java.Exceptions;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class CheckedExceptions {

	public static void main(String[] args) throws InterruptedException, FileNotFoundException  {

//		example 1
		
		PrintWriter pw = new PrintWriter("C:\\Users\\nmurthy\\OneDrive - GalaxE. Solutions, Inc\\Desktop\\Checked.txt");
		
		pw.print("Hello");
		
//		example 2
		
		System.out.println("I Want to Sleep Happily");
		Thread.sleep(1000);
		
	}

}
