package com.java.Java8CodingQuestions;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.stream.Collectors;

public class SeparateEvenANDOddNum {

	public static void main(String[] args) {

		List<Integer> listOfIntegers = Arrays.asList(71, 18, 42, 21, 67, 32, 95, 14, 56, 87);

		Map<Boolean, List<Integer>> OddEvenNumberMap = listOfIntegers.stream()
				.collect(Collectors.partitioningBy(i -> i % 2 == 0));

		System.out.println(OddEvenNumberMap);

		Set<Entry<Boolean, List<Integer>>> entrySet = OddEvenNumberMap.entrySet();

		System.out.println(entrySet);
		System.out.println();

		for (Entry<Boolean, List<Integer>> entry : entrySet) {

//			System.out.println(entry.getKey());
//			System.out.println(entry.getValue());

			if (entry.getKey()) {
				System.out.println("Even Numbers : ");
			} else {
				System.out.println("Odd Numbers : ");
			}

			for (int i : entry.getValue()) {
				System.out.println(i);
			}

		}

	}

}
