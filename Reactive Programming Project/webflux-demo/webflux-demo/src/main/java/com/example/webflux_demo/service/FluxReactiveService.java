package com.example.webflux_demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;

@Service
public class FluxReactiveService {

    private static final Logger log = LoggerFactory.getLogger(FluxReactiveService.class);

    public Flux<String> getMessageStream() {

        return Flux.range(1, 5) // Emit 5 items
                .delayElements(Duration.ofSeconds(1)) // 1-second gap (non-blocking)
                .doOnNext(i -> log.info("Emitting item {} on thread {}", i, Thread.currentThread().getName()))
                .map(i -> "Message - " + i + " ")
                .subscribeOn(Schedulers.boundedElastic()); // Allows async work
    }
}
