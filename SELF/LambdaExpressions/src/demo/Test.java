package demo;

@FunctionalInterface
interface Cab{
	
	public String bookCab(String Source, String Destination);   // Single abstract method
	
}

// 

//class Ola implements Cab
//{

//	@Override
//	public void bookCab() {
//       System.out.println("Ola Cab Is Booked....");		
//	}
	
	// LAMBDA EXPRESSION

//	()->System.out.println("Ola Cab Is Booked....");
	
//}






public class Test {


	public static void main(String[] args) {

//		Cab cab = new Ola();
		
// Lambda Expression required Functional Interface to Invoke lambda Expression.		
		Cab cab = (Source,Destination)->
		{
			System.out.println("Ola Cab Is Booked from " + Source + " To "+ Destination);
			return("Price is Rs.5000/-");
		};
		
//		cab.bookCab("Bangalore", "Shivamogga");
		
		System.out.println(cab.bookCab("Bangalore", "Shivamogga"));
	}

}
