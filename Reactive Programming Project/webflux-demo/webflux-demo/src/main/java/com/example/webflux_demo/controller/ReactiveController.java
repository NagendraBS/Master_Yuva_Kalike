package com.example.webflux_demo.controller;

import com.example.webflux_demo.service.SlowReactiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class ReactiveController {
    private static final Logger log = LoggerFactory.getLogger(ReactiveController.class);

    private final SlowReactiveService slowReactiveService;

    public ReactiveController(SlowReactiveService slowReactiveService) {
        this.slowReactiveService = slowReactiveService;
    }

    // Single non-blocking slow call: still around 3 seconds,
    // but thread is not blocked during waiting.
    @GetMapping("/reactive/one")
    public Mono<String> oneReactiveCall() {
        log.info("Handling /reactive/one on thread {}", Thread.currentThread().getName());
        return slowReactiveService.callSlowService("ONE");
    }

    /**
     * Three slow calls started together.
     * <p>
     * All three calls wait 3 seconds in parallel.
     * Total time ≈ 3 seconds (not 9), because they are concurrent and non-blocking.
     */
    @GetMapping("/reactive/three")
    public Flux<String> threeReactiveCalls() {
        log.info("Handling /reactive/three on thread {}", Thread.currentThread().getName());

        Mono<String> a = slowReactiveService.callSlowService("A");
        Mono<String> b = slowReactiveService.callSlowService("B");
        Mono<String> c = slowReactiveService.callSlowService("C");

//        return Mono.zip(a, b, c)
//                .map(tuple -> tuple.getT1() + " | " + tuple.getT2() + " | " + tuple.getT3());

        return Flux.merge(a, b, c);
    }



}
