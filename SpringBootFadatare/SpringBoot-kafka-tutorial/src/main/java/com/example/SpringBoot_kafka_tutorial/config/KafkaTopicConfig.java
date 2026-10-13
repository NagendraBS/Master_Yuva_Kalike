package com.example.SpringBoot_kafka_tutorial.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic javaGuidesTopic(){

        return TopicBuilder.name("javaguides")
                .build();  // To Build The Topic
    }


    // This Bean Is Created to handle The Json Type Message Data
    @Bean
    public NewTopic javaGuidesJsonTopic(){

        return TopicBuilder.name("javaguides_json")
                .build();  // To Build The Topic
    }


}
