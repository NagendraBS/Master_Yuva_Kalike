package com.example.SpringBoot_kafka_tutorial.kafka;


import com.example.SpringBoot_kafka_tutorial.payload.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;

@Service
public class JsonKafkaConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonKafkaProducer.class);

    @KafkaListener(topics= "javaguides_json", groupId = "myGroup")
    public void consume(User user){

            LOGGER.info(String.format("JSON Message Received -> %s", user.toString()));


    }

}
