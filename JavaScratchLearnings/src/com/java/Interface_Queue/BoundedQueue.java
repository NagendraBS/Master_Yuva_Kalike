package com.java.Interface_Queue;

import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class BoundedQueue {

	public static void main(String[] args) throws InterruptedException {

		ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<>(3);

        queue.put(1);
        queue.put(2);
        queue.put(3);
//        queue.put(4);   // if you uncomment this, Since Queue is Blocked Queue it will Wait until the Space Releases

        System.out.println("Queue: " + queue);
//         queue.put(4); // This will block or throw an exception if uncommented

        System.out.println("Removed: " + queue.take());

          System.out.println("Queue after removing: " + queue);
        System.out.println( "Take "  + queue.take());
        System.out.println( "Take "  + queue.take());
        System.out.println( "Take "  + queue.take());  //  take() , Run Bounded Queue Waiting.... Until Other Element added to Queue
		
		
	}

}
