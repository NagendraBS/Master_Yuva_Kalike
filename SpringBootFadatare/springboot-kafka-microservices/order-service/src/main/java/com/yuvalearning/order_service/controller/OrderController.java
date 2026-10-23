package com.yuvalearning.order_service.controller;

import com.yuvalearning.base_domains.dto.Order;
import com.yuvalearning.base_domains.dto.OrderEvent;
import com.yuvalearning.order_service.kafka.OrderProducer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")     // @RequestMapping used to Provide The base URL
public class OrderController {

    private OrderProducer orderProducer;

    public OrderController(OrderProducer orderProducer) {
        this.orderProducer = orderProducer;
    }

    @PostMapping("/orders")
    public String placeOrder(@RequestBody Order order){
        // @RequestBody Annotation Converts Json Object to Java Object

        order.setOrderId(UUID.randomUUID().toString());

        OrderEvent orderEvent = new OrderEvent();
        orderEvent.setStatus("PENDING");
        orderEvent.setMessage("Order is in Pending State !");
        orderEvent.setOrder(order);

        orderProducer.sendMessage(orderEvent);

        return "Order Placed Successfully...." ;

    }

}
