package com.java.patterns;

class Parent {
    public static void show() {
        System.out.println("Parent's static show()");
    }
}

class Child extends Parent {
    public static void show() {
        System.out.println("Child's static show()");
    }

    public static void main(String[] args) {
        Parent p = new Child();
        p.show(); // Output: Parent's static show()
    }
}

