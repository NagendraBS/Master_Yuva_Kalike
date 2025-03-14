package com.java.Loops;

public class Modifying_Loop_Variables_Inside_the_Loop {

	public static void main(String[] args) {

		for (int i = 0; i < 5; i++) {
            if (i == 2) {
              
                // Modifies the loop variable and skips the next iteration
                i++;
            }
            System.out.println(i);
        }
	}

}
