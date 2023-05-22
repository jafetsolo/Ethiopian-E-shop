package com.example.ingredient.Configs;

import com.example.ingredient.Service.AuthService;
import com.example.ingredient.Service.RoleService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class IngredientConfig {
    private final RoleService roleService;
    private final AuthService authService;

    @Bean
    public CommandLineRunner init () {
        System.out.println("Initiating----->");
        return args -> {
            roleService.init();
            authService.init();
        };
    }
}
