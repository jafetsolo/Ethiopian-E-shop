package com.example.ingredient.Repository;

import com.example.ingredient.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository  extends JpaRepository<Order, Long> {
}
