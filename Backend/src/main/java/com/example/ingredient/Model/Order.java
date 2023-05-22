package com.example.ingredient.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "orders"
)
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @OneToMany(cascade = CascadeType.ALL)
    private List<SingleOrder> items;


    @NotBlank
    @OneToOne()
    private User orderedBy;


    private Double total;

}
