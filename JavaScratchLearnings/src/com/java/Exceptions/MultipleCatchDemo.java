package com.java.Exceptions;

public class MultipleCatchDemo {

	public static void main(String[] args) {

		try {
			int number[] = {1,2,3};
			
			System.out.println(number[4]);
			//ArithmeticException
			int results = 10 / 0;
			
			//ArrayIndexOutOfBoundsException
			
		} catch (ArithmeticException ae) {
            System.out.println("Caught ArithmeticException: " + ae.getMessage());

        } catch (ArrayIndexOutOfBoundsException aioobe) {
            System.out.println("Caught ArrayIndexOutOfBoundsException: " + aioobe.getMessage());

        } catch (Exception e) {
            System.out.println("Caught General Exception: " + e.getMessage());
        }

        System.out.println("Program continues after exception handling");
	}

}
