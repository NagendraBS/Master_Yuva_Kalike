package com.example.webflux_demo.controller;

import com.example.webflux_demo.service.FluxReactiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class FluxController {

    private static final Logger log = LoggerFactory.getLogger(FluxController.class);

    private final FluxReactiveService fluxReactiveService;

    public FluxController(FluxReactiveService fluxReactiveService) {
        this.fluxReactiveService = fluxReactiveService;
    }

    @GetMapping("/reactive/flux-stream")
    public Flux<String> streamMessages() {
        log.info("Handling /reactive/flux-stream on thread {}", Thread.currentThread().getName());
        return fluxReactiveService.getMessageStream();
    }
}
