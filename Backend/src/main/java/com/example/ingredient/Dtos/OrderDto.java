package com.example.ingredient.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@NoArgsConstructor
@Data
public class OrderDto {
    @NotBlank
    private List<SingleOrderDto> items;

    private Long orderedBy;

    private Double total;
}
