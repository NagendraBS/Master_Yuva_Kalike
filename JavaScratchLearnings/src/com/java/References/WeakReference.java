//package com.java.References;
//
//public class WeakReference {
//
////	public static void main(String[] args) {
////
////		Object obj = new Object();
////		
////		WeakReference<Object> weakRef = new WeakReference(obj);
////		
////		System.out.println("Before Garbage Collection" + weakRef.get());
////		
////		
////	}
//	
//	public static void main(String[] args) {	
//       MyClass obj = new MyClass();
//        
//        WeakReference<MyClass> wobj = new WeakReference<>(obj);
//        
//        System.out.println("Before GC: " + wobj.get());  
//
//        obj = null;  
//
//        System.gc();  
//
//        System.out.println("After GC: " + wobj.get()); 
//    }
//
//
//}
