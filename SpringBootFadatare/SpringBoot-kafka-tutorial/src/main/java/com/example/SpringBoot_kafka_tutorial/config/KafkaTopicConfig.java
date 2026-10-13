package com.example.SpringBoot_kafka_tutorial.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Value("${spring.kafka.topic.name}")
    private String topicName;

    @Value("${spring.kafka.topic-json.name}")
    private String topicJsonName;

    @Bean
    public NewTopic javaGuidesTopic(){

        return TopicBuilder.name(topicName)
                .build();  // To Build The Topic
    }


    // This Bean Is Created to handle The Json Type Message Data
    @Bean
    public NewTopic javaGuidesJsonTopic(){

        return TopicBuilder.name(topicJsonName)
                .build();  // To Build The Topic
    }


}
