package com.springcore.ResourceLoader;

import java.io.*;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Scanner;

import javax.print.DocFlavor.INPUT_STREAM;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;

public class App {

	public static void main(String[] args) {

		ApplicationContext applicationContext = new ClassPathXmlApplicationContext(); 

		// Through File system 
		Resource fileResource = applicationContext.getResource("file:C:\\Users\\nmurthy\\OneDrive - GalaxE. Solutions, Inc\\Desktop\\Hello.txt"); 

		// Through URL path 
		Resource urlResource = applicationContext.getResource("url:https://www.gutenberg.org/cache/epub/73904/pg73904.txt"); 

		
		// Through Classpath 
		Resource classpathResource = applicationContext 
										.getResource("classpath:com/springcore/ResourceLoader/Untitled"); 

		readfileThroughResource(classpathResource); 
		// We can call readFileThroughResource for 
		// any resource object representing a file 
	}

	private static void readfileThroughResource(Resource resource) {
		

			try { 
				InputStream is = resource.getInputStream(); 
				BufferedReader br = new BufferedReader(new InputStreamReader(is)); 

				String line; 
				while ((line = br.readLine()) != null) { 
					System.out.println(line); 
				} 
				br.close(); 
			} 
			catch (IOException e) { 
				e.printStackTrace(); 
			} 
		
	}

}
