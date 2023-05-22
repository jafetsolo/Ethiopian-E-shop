package com.example.ingredient.Dtos.Auth;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class JwtResponse {
    private String token;
    private Long id;
    private String type = "Bearer";
    private String firstName;
    private String lastName;
    private String image;
    private String email;
    private List<String> roles;


    public JwtResponse(String accessToken,String image, Long id, String firstName,String lastName, String email, List<String> roles
    ) {
        this.token = accessToken;
        this.image = image;
        this.id = id;
        this.firstName = firstName;
        this.lastName= lastName;
        this.email = email;
        this.roles = roles;
    }

}
