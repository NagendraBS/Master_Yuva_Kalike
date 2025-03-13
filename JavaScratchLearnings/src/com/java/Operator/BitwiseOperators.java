package com.java.Operator;

public class BitwiseOperators {

	public static void main(String[] args) {

		int d = 0b1010; // 10 in binary
        int e = 0b1100; // 12 in binary

        // AND operator (&)
        int andResult = d & e;  // 1010 & 1100 = 1000 (8 in decimal)
        System.out.println("d & e: " + andResult);  // Output: 8

        // OR operator (|)
        int orResult = d | e;   // 1010 | 1100 = 1110 (14 in decimal)
        System.out.println("d | e: " + orResult);  // Output: 14

        // XOR operator (^)
        int xorResult = d ^ e;  // 1010 ^ 1100 = 0110 (6 in decimal)
        System.out.println("d ^ e: " + xorResult);  // Output: 6

        // NOT operator (~) on d
        int notResult = ~d;     // ~1010 = 0101 (flip all bits of 10)
        System.out.println("~d: " + notResult);  // Output: -11 (2's complement representation)

        // Left Shift operator (<<)
        int leftShiftResult = d << 1; // 1010 << 1 = 10100 (20 in decimal)
        System.out.println("d << 1: " + leftShiftResult);  // Output: 20

        //Output Calculation:
        //   10100  =  (1 * 2^4) + (0 * 2^3) + (1 * 2^2) + (0 * 2^1) + (0 * 2^0) = 16 + 0 + 4 + 0 + 0 = 20	
        
        
        // Right Shift operator (>>)
        int rightShiftResult = d >> 1; // 1010 >> 1 = 0101 (5 in decimal)
        System.out.println("d >> 1: " + rightShiftResult);  // Output: 5

        // Unsigned Right Shift operator (>>>)
        int unsignedRightShiftResult = d >>> 1; // 1010 >>> 1 = 0101 (5 in decimal)
        System.out.println("d >>> 1: " + unsignedRightShiftResult);  // Output: 5
		
		
	}

}
