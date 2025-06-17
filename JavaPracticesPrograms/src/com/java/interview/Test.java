package com.java.interview;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

	 public static void main(String[] args) {
	        String[] votes = {
	            "john", "johnny", "jackie", "johnny", "john", "jackie",
	            "jamie", "jamie", "john", "johnny", "jamie", "johnny", "john"
	        };

	        Map<String, Integer> voteMap = new HashMap<>();
	        
	        for (String name : votes) {
	            voteMap.put(name, voteMap.getOrDefault(name, 0) + 1);
	        }

	       
	        
	        System.out.println(voteMap);
	        
	        System.out.println("Vote counts:");
	        for (Map.Entry<String, Integer> entry : voteMap.entrySet()) {
	            System.out.println(entry.getKey() + " : " + entry.getValue());
	        }

	        
	        
	        String winner = "";
	        int maxVotes = 0;

	        for (Map.Entry<String, Integer> entry : voteMap.entrySet()) {
	            String name = entry.getKey();
	            int count = entry.getValue();

	            if (count > maxVotes || (count == maxVotes && name.compareTo(winner) < 0)) {
	                maxVotes = count;
	                winner = name;
	            }
	        }

	        System.out.println("\nWinner: " + winner + " with " + maxVotes + " votes");
	        
	    }
	
}