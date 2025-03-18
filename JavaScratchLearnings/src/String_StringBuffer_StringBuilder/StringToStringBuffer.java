package String_StringBuffer_StringBuilder;

public class StringToStringBuffer {

	public static void main(String[] args) {

        // Custom input string
		String s = "Geeks";
		
		// Converting String object to StringBuffer object by creating object of StringBuffer class
		StringBuffer sbf = new StringBuffer(s);
		
		//Reversing the String
		System.out.println("String Reveresed : " + sbf.reverse() );
		
		
		// Converting String object to StringBuilder object
        StringBuilder sbl = new StringBuilder(s);
        
        // Adding it to string using append() method
        System.out.println("Appending String : " + sbl.append("forGeeks"));
        
		
		
	}

}
