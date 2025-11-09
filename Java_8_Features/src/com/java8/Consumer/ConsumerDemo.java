package com.java8.Consumer;

import java.util.function.Consumer;

public class ConsumerDemo {

	public static void main(String[] args) {

		Consumer<String> c = s -> System.out.println(s);

		c.accept("Yuvaraj");
		c.accept("NAGENDRA");

	}

}
