package com.example.ingredient.Dtos;

import com.example.ingredient.Model.Item;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Data
public class SingleOrderDto {
    @NotBlank
    private Long item;

    @NotBlank
    private Double quantity;

}
