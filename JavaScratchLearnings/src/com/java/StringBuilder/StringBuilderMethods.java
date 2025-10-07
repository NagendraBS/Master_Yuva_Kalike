package com.java.StringBuilder;

public class StringBuilderMethods {

	public static void main(String[] args) {

		// Create a new StringBuilder with the initial content "GeeksforGeeks"
		StringBuilder strbldr = new StringBuilder("GeeksforGeeks");
		
		System.out.println("Initial StringBuilder: " + strbldr);

        // 1. Append a string to the StringBuilder
        strbldr.append(" is awesome!");
        System.out.println("After append: " + strbldr);

        // 2. Insert a substring at a specific position
        strbldr.insert(13, " Java");
        System.out.println("After insert: " + strbldr);

        // 3. Replace a substring with another string
        strbldr.replace(0, 5, "Welcome to");
        System.out.println("After replace: " + strbldr);

        // 4. Delete a substring from the StringBuilder
        strbldr.delete(8, 14);
        System.out.println("After delete: " + strbldr);

        // 5. Reverse the content of the StringBuilder
        strbldr.reverse();
        System.out.println("After reverse: " + strbldr);

        // 6. Get the current capacity of the StringBuilder
        int capacity = strbldr.capacity();
        System.out.println("Current capacity: " + capacity);

        // 7. Get the length of the StringBuilder
        int length = strbldr.length();
        System.out.println("Current length: " + length);

        // 8. Access a character at a specific index
        char charAt5 = strbldr.charAt(5);
        System.out.println("Character at index 5: " + charAt5);

        // 9. Set a character at a specific index
        strbldr.setCharAt(5, 'X');
        System.out.println("After setCharAt: " + strbldr);

        // 10. Get a substring from the StringBuilder
        String substring = strbldr.substring(5, 10);
        System.out.println("Substring (5 to 10): " + substring);

        // 11. Find the index of a specific substring
        strbldr.reverse(); // Reversing back to original order for search
        int indexOfGeeks = strbldr.indexOf("Geeks");
        System.out.println("Index of 'Geeks': " + indexOfGeeks);

        // 12. Delete a character at a specific index
        strbldr.deleteCharAt(5);
        System.out.println("After deleteCharAt: " + strbldr);

        // 13. Convert the StringBuilder to a String
        String result = strbldr.toString();
        System.out.println("Final String: " + result);
		
		
	}

}
