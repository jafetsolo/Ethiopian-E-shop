package com.example.ingredient.Controller;

import com.example.ingredient.Dtos.OrderDto;
import com.example.ingredient.Model.Item;
import com.example.ingredient.Model.Order;
import com.example.ingredient.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<?> getOrders(){
        return orderService.getAll();
    }

    @GetMapping()
    public ResponseEntity<?> getOrder(Long id){
        return orderService.get(id);
    }

    @PostMapping()
    public ResponseEntity<?> addOrder(@RequestBody OrderDto order){
        return orderService.add(order);
    }

    @PutMapping()
    public ResponseEntity<?> editOrder(Order order){
        return orderService.edit(order);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteOrder(Long id){
        return orderService.delete(id);
    }

}
