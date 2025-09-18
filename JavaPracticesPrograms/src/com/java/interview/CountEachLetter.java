package com.java.interview;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class CountEachLetter {

	public static void main(String[] args) {

		String input = "JavaJ2EE2";

		input = input.toLowerCase();

		// Create a map to hold character frequencies
		Map<Character, Integer> freqMap = new HashMap<Character, Integer>();

		for (char eachChar : input.toCharArray()) {

			if (eachChar == ' ')
				continue;
			freqMap.put(eachChar, freqMap.getOrDefault(eachChar, 0) + 1);

		}

		for (Map.Entry<Character, Integer> entrySet : freqMap.entrySet()) {

			System.out.println(entrySet.getKey() + " -> " + entrySet.getValue());
		}

	}

}
