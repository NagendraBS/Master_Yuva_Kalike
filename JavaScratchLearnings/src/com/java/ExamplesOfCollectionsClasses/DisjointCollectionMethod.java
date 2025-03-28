package com.java.ExamplesOfCollectionsClasses;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DisjointCollectionMethod {

	public static void main(String[] args) {

		List<String> l1 = new ArrayList<>();

        // Add elements to l1
        l1.add("Shoes");
        l1.add("Toys");
        l1.add("Horse");
        l1.add("Tiger");

        List<String> l2 = new ArrayList<>();

        // Add elements to l2
        l2.add("Bat");
        l2.add("Frog");
        l2.add("Lion");

        // Check if disjoint or not
        System.out.println(
            Collections.disjoint(l1, l2));
		
	}

}
