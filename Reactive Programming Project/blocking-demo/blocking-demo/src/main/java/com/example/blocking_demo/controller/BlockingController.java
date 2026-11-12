package com.example.blocking_demo.controller;

import com.example.blocking_demo.service.SlowBlockingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlockingController {

    private static final Logger log = LoggerFactory.getLogger(BlockingController.class);

    private final SlowBlockingService slowBlockingService;

    public BlockingController(SlowBlockingService slowBlockingService) {
        this.slowBlockingService = slowBlockingService;
    }

    // Single slow call: takes around 3 seconds
    @GetMapping("/blocking/one")
    public String oneBlockingCall() {
        log.info("Handling /blocking/one on thread {}", Thread.currentThread().getName());
        return slowBlockingService.callSlowService("ONE");
    }

    // Three slow calls in sequence: around 9 seconds total (3 + 3 + 3)
    @GetMapping("/blocking/three")
    public String threeBlockingCalls() {
        log.info("Handling /blocking/three on thread {}", Thread.currentThread().getName());

        String a = slowBlockingService.callSlowService("A");
        String b = slowBlockingService.callSlowService("B");
        String c = slowBlockingService.callSlowService("C");

        return a + " | " + b + " | " + c;
    }

}
