package com.example.ingredient.Dtos.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignUpRequest {
    private MultipartFile image;
    private String firstName;
    private String lastName;
    private String role;
    private String password;
    private String email;

}
