package com.java.ExecutorServices;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExcecutorServiceDemo {

	public static void main(String[] args) {

		ExecutorService executor  = Executors.newFixedThreadPool(4);

        for (int i = 1; i <= 7; i++) {
            final int taskId = i;
            
            
            executor.submit(() -> {
                System.out.println("Task " + taskId + " is running on " + Thread.currentThread().getName());
            });
            
        }
        

//        executor.shutdown();
    }
		
	}


