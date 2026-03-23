package com.java.concurrentCollections;

import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapDemo1 extends Thread {

	static ConcurrentHashMap<Integer, String> m = new ConcurrentHashMap<Integer, String>();

	@Override
	public void run() {

		try {
			Thread.sleep(2000);
			
		} catch (InterruptedException e) {

			e.printStackTrace();
		}

		
		System.out.println("Child Thread updating Map...");
		m.put(103, "C");
		
	}

	public static void main(String[] args) throws InterruptedException {

		// Main Thread

		m.put(101, "A");
		m.put(102, "B");

		System.out.println(m);

		// Child Thread
		ConcurrentHashMapDemo1 t = new ConcurrentHashMapDemo1();
		t.start();

		Set s = m.keySet();

		Iterator itr = s.iterator();

		while (itr.hasNext()) {

			Integer i = (Integer) itr.next();

			System.out.println("Main Thread Iterating and The Current Entry is : " + i + "........" + m.get(i));

			Thread.sleep(3000);

		}

		System.out.println(m);

	}

}
