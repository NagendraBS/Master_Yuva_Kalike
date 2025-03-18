package String_StringBuffer_StringBuilder;

public class Diff_String_StringBuffer_StringBuilder {

	// Method 1
    // Concatenates to String
	public static void concat1(String s1) {
		
		s1 = s1 + "forGeeks";
	}
	
	
	// Method 2
    // Concatenates to StringBuilder
	public static void concat2(StringBuilder s2) {
		
		s2.append("forGeeks");
	}
	
	// Method 3
    // Concatenates to StringBuffer
	 public static void concat3(StringBuffer s3) {
		 s3.append("forGeeks");
	 }
	 
	
	
	public static void main(String[] args) {

		//Custom Input
		String s1 = "Geeks";
		
        // Calling above defined method
		concat1(s1);
		
		//s1 is Not Changed
		System.out.println("String : " + s1);
		
		
        // String 1
		StringBuilder s2 = new StringBuilder("Geeks");
		
		//calling above Defined Method2
		concat2(s2);
		
		//s2 is Changed, 
        System.out.println("StringBuilder: " + s2);
        

        
        StringBuffer s3 =  new StringBuffer("Geeks");
        
        concat3(s3);
		
        System.out.println("String Buffer : " + s3);
        
        
		
	}

}
