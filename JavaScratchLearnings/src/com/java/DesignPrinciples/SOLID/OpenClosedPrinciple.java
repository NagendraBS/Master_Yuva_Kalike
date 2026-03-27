package com.java.DesignPrinciples.SOLID;


interface CopayStrategy {
    double calculate(double billAmount);
}


class BasicPlanCopay implements CopayStrategy {
    @Override
    public double calculate(double billAmount) {
        return billAmount * 0.10;
    }
}

class PremiumPlanCopay implements CopayStrategy {
    @Override
    public double calculate(double billAmount) {
        return billAmount * 0.05;
    }
}

class GoldPlanCopay implements CopayStrategy {
    @Override
    public double calculate(double billAmount) {
        return billAmount * 0.02;
    }
}

class CopayService {
    public double calculateCopay(CopayStrategy strategy, double billAmount) {
        return strategy.calculate(billAmount);
    }
}


//A class should be open for extension but closed for modification.


/*Why this is good

If tomorrow a PlatinumPlanCopay comes, you just create a new class.
Old code does not need modification. */

public class OpenClosedPrinciple {

	public static void main(String[] args) {
		CopayService service = new CopayService();

        double basicCopay = service.calculateCopay(new BasicPlanCopay(), 1000);
        double premiumCopay = service.calculateCopay(new PremiumPlanCopay(), 1000);
        double goldCopay = service.calculateCopay(new GoldPlanCopay(), 1000);

        System.out.println("Basic Plan Copay: " + basicCopay);
        System.out.println("Premium Plan Copay: " + premiumCopay);
        System.out.println("Gold Plan Copay: " + goldCopay);
		
		
	}

}
