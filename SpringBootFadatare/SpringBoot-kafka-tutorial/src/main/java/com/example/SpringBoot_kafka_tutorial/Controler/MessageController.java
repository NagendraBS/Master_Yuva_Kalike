package com.example.SpringBoot_kafka_tutorial.Controler;

import com.example.SpringBoot_kafka_tutorial.kafka.KafkaProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/kafka")
public class MessageController {

    private KafkaProducer kafkaProducer;


    public MessageController (KafkaProducer kafkaProducer){
        this.kafkaProducer = kafkaProducer;

    }

    // Creating REST endpoints

    // http:localhost:8080/api/v1/kafka/publish?message=hello world
    @GetMapping("/publish")
    public ResponseEntity<String> publish(@RequestParam("message")  String message){

            kafkaProducer.sendMessage(message);

            return ResponseEntity.ok("Message Sent to the TOPIC");

    }
}
