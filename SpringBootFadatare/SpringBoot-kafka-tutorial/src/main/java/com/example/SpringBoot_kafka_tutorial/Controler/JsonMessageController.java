package com.example.SpringBoot_kafka_tutorial.Controler;


import com.example.SpringBoot_kafka_tutorial.kafka.JsonKafkaProducer;
import com.example.SpringBoot_kafka_tutorial.payload.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/kafka")
public class JsonMessageController {

    private JsonKafkaProducer kafkaProducer;

    public JsonMessageController(JsonKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

// http://localhost:8080/api/v1/kafka/publish
    @PostMapping("/publish")
    public ResponseEntity<String> publish (@RequestBody User user){

        kafkaProducer.sendMessage(user);

        return ResponseEntity.ok("JSON Message Sent to Kafka Topic");


    }
}
