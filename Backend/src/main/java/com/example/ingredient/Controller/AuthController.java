package com.example.ingredient.Controller;

import com.example.ingredient.Dtos.Auth.LoginRequest;
import com.example.ingredient.Dtos.Auth.SignUpRequest;
import com.example.ingredient.Service.AuthService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping(value ="/signup",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(@ModelAttribute SignUpRequest signUpRequest) {
       return authService.signUp(signUpRequest.getImage(), signUpRequest);
    }

    @PutMapping(value ="/edit",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editUser(@RequestParam Long id,@ModelAttribute SignUpRequest signUpRequest) {
        return authService.edit(id, signUpRequest);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteUser(Long id){
        return authService.delete(id);
    }
}