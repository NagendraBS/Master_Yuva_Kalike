package com.java.interview;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Test {

	 public static void main(String[] args) {
		 
	        String[] votes = {
	             "jackie", "johnny", "john","johnny", "jackie",
	            "jamie", "jamie", "john", "johnny", "jamie", "johnny", "john","john",
	        };

	       
	        Map<String, Integer> voteCounts = new HashMap<String, Integer>();
	        
	        System.out.println(voteCounts);
	        
	//  Counting the Votes
	        
	        for(String eachVote : votes) {
//	        	System.out.println(eachVote + "");
	        	
	        	if(voteCounts.containsKey(eachVote)) {
	        		voteCounts.put(eachVote, voteCounts.get(eachVote) + 1 );
	        		
	        	}
	        	else {
	        		voteCounts.put(eachVote, 1);
	        	}
	        	
	        }
	        
	        
	        System.out.println("voteCounts : " + voteCounts );
	        
	        
// 	 Checking the Max Votes for the Person
	        
	        int maxCount = 0;
	        String winner = "";
	        
	      for(Map.Entry<String, Integer> voteSet : voteCounts.entrySet()) {
	    	  
//	    	  System.out.println(voteSet);
	    	  
	    	  if(voteSet.getValue() > maxCount) {
	    		  maxCount = voteSet.getValue();
	    		  winner = voteSet.getKey();
	    	  }
	    	  
	    	  else if(voteSet.getValue() == maxCount){
	    		  
	    		  if(voteSet.getKey().length() < winner.length() ) {
	    			  
	    			  winner = voteSet.getKey();
	    		  }
	    		  
	    	  }
 
	    	  System.out.println(voteSet);
	      }
	      
	      System.out.println("Winner : " + winner);
	        
	        
	    }
	
}