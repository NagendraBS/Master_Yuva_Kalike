package com.java.Interface;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;


//By implementing Serializable interface
//we make sure that state of object of class A
//can be saved in a file.

class SerialIntfcEX implements Serializable{
	
	int i;
	String s;
	
	public SerialIntfcEX(int i, String s) {
		this.i = i;
		this.s = s;
	}
	
}


public class Serializable_Interface {

	public static void main(String[] args) throws IOException, ClassNotFoundException{

		SerialIntfcEX serial = new SerialIntfcEX(20, "GeeksforGeeks");
		 
		
		 // Serializing Class "SerialIntfcEX"
		
		FileOutputStream fos = new FileOutputStream("C:\\Users\\nmurthy\\Serial.txt");
		ObjectOutputStream oos = new ObjectOutputStream(fos);
		oos.writeObject(serial);
		
		// De-Serializing Class "SerialIntfcEX"
		FileInputStream fis = new FileInputStream("C:\\Users\\nmurthy\\Serial.txt");
		ObjectInputStream ois = new ObjectInputStream(fis);
		
		// down-casting object
		 SerialIntfcEX serial1 = (SerialIntfcEX) ois.readObject();
		
		 
		 System.out.println(serial1.i + " " +serial1.s);
		 
		// closing streams
	        oos.close();
	        ois.close();
	}

}
