package com.example.blocking_demo.service;

import org.slf4j.LoggerFactory;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class SlowBlockingService {
    private static final Logger log = LoggerFactory.getLogger(SlowBlockingService.class);

    public String callSlowService(String name) {
        log.info("Blocking service started for {} on thread {}", name, Thread.currentThread().getName());
        try {
            // Simulate slow external service call (for example external REST call or database)
            Thread.sleep(3000); // 3 seconds blocking
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();

        }
        log.info("Blocking service finished for {} on thread {}", name, Thread.currentThread().getName());
        return "Response from BLOCKING service: " + name;
    }

}
