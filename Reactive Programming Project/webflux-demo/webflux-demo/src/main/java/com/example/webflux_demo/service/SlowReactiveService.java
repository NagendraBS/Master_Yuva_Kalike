package com.example.webflux_demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class SlowReactiveService {
    private static final Logger log = LoggerFactory.getLogger(SlowReactiveService.class);

    /**
     * Simulates a slow external service call in a non-blocking way.
     * Mono.delay does not block the thread. It schedules a signal after the given duration.
     */
    public Mono<String> callSlowService(String name) {
        log.info("Reactive service started for {} on thread {}", name, Thread.currentThread().getName());

        return Mono
                .delay(Duration.ofSeconds(10)) // wait 3 seconds without blocking a thread
                .map(tick -> {
                    log.info("Reactive service finished for {} on thread {}", name, Thread.currentThread().getName());
                    return "Response from REACTIVE service: " + name;
                });
    }
}
