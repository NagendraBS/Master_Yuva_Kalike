package com.java.MultiThreading;

import java.nio.file.spi.FileSystemProvider;

public class ThreadSleepDemo {

	public static void main(String[] args) throws InterruptedException
	{

		for(int i = 1; i <= 10; i++) {
			System.out.println("Slide - " + i);
			Thread.sleep(5000);
		}
	}

}
