package com.example.ingredient.Service;

import com.example.ingredient.Dtos.OrderDto;
import com.example.ingredient.Model.Item;
import com.example.ingredient.Model.Order;
import com.example.ingredient.Model.SingleOrder;
import com.example.ingredient.Model.User;
import com.example.ingredient.Repository.ItemRepository;
import com.example.ingredient.Repository.OrderRepository;
import com.example.ingredient.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;


    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(orderRepository.findAll());
    }

    public ResponseEntity<?> get(Long id){
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()){
            return ResponseEntity.ok(order.get());
        }else{
            return new ResponseEntity<>( "Not Found", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> add(OrderDto order){
        try{
            User user = userRepository.findById(order.getOrderedBy())
                    .orElseThrow(() -> new RuntimeException("Error: User is not found."));
            AtomicReference<Double> total = new AtomicReference<>(0.0);
            List<SingleOrder> singleOrders = order.getItems().stream().map((singleOrderDto -> {
                Item item = itemRepository.findById(singleOrderDto.getItem())
                        .orElseThrow(() -> new RuntimeException("Error: Item is not found."));
                total.updateAndGet(v -> v + item.getPrice() * singleOrderDto.getQuantity());
                SingleOrder singleOrder = new SingleOrder();
                singleOrder.setItem(item);
                singleOrder.setQuantity(singleOrderDto.getQuantity());
                return  singleOrder;
            })).collect(Collectors.toList());
            Order newOrder = new Order();
            newOrder.setOrderedBy(user);
            newOrder.setItems(singleOrders);
            newOrder.setTotal(total.get());
            Order savedOrder = orderRepository.save(newOrder);
            return ResponseEntity.ok(savedOrder);
        }catch (Exception exception){
            System.out.println(exception.getMessage());
            return new ResponseEntity<>( exception.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> edit(Order order){
        try{
            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        }catch (Exception exception){
            return new ResponseEntity<>( "Unable to Edit",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> delete(Long id){
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()){
            orderRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }else{
            return new ResponseEntity<>( "Not Found",HttpStatus.BAD_REQUEST);
        }
    }
}
