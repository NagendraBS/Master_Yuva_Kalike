package com.java.ObjectOrientedProgramming;


class SolarSystem {
}

class Earth extends SolarSystem {
}

class Mars extends SolarSystem {
}


public class Hybrid_Inheritance extends Earth {

	public static void main(String[] args) {

		SolarSystem s = new SolarSystem();
        Earth e = new Earth();
        Mars m = new Mars();
        Hybrid_Inheritance hi = new Hybrid_Inheritance();

        System.out.println(s instanceof SolarSystem);
        System.out.println(e instanceof Earth);
        System.out.println(m instanceof SolarSystem);
        System.out.println(hi instanceof Earth);
		
	}

}
