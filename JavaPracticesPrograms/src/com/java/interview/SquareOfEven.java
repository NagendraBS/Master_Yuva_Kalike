package com.java.interview;

public class SquareOfEven {

	public static void main(String[] args) {

		String values[] = { "1", "2", "3", "4", "7", "10" };

		Integer sumOfValues = getSumOfSquaresOfEven(values);

		System.out.println(sumOfValues);

		

	}

	private static Integer getSumOfSquaresOfEven(String[] values) {

		int sum = 0;
		
		for (String val : values) {

			Integer num = Integer.parseInt(val);   // 1, 2, 3, 4, 7, 10
			
			try {
				
				if(num % 2 == 0) {
					sum = (num * num) + sum ;
				}
				
			} catch (Exception e) {

				System.out.println(e.getMessage());
			}
			
			
		}

		return sum;

	}

}
