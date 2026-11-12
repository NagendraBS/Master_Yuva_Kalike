package com.java.Collections;

import java.util.ArrayDeque;
import java.util.Deque;

public class PrescriptionQueue {

    public static void main(String[] args) {

        Deque<String> prescriptions = new ArrayDeque<>();

        prescriptions.addLast("RX101");
        prescriptions.addLast("RX102");
        prescriptions.addLast("RX103");

        // Urgent prescription
        prescriptions.addFirst("RX999");

        while (!prescriptions.isEmpty()) {

            System.out.println(
                    "Processing: " + prescriptions.pollFirst()
            );
        }
    }

}
