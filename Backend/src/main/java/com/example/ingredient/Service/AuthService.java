package com.example.ingredient.Service;

import com.example.ingredient.Configs.security.JwtUtils;
import com.example.ingredient.Dtos.Auth.JwtResponse;
import com.example.ingredient.Dtos.Auth.LoginRequest;
import com.example.ingredient.Dtos.Auth.MessageResponse;
import com.example.ingredient.Dtos.Auth.SignUpRequest;
import com.example.ingredient.Model.ERole;
import com.example.ingredient.Model.Item;
import com.example.ingredient.Model.Role;
import com.example.ingredient.Model.User;
import com.example.ingredient.Repository.RoleRepository;
import com.example.ingredient.Repository.UserRepository;
import com.example.ingredient.Service.UserDetail.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private final CloudinaryService cloudinaryService;

    public void init(){
        Optional<User> admin= userRepository.findByEmail("admin@admin.com");
        Optional<Role> adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
        if(admin.isEmpty() && adminRole.isPresent()){
            User newAdmin = new User(
                    "https://res.cloudinary.com/dmahd3die/image/upload/v1684245855/photo_2023-05-16_17-03-59_mm7b0z.jpg",
                    "admin",
                    "admin",
                    "admin@admin.com",
                    encoder.encode("admin")
            );
            newAdmin.setRole(adminRole.get());
            userRepository.save(newAdmin);
        }
    }

    public ResponseEntity login(LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());



        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getImage(),
                userDetails.getId(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                roles ));
    }

    public ResponseEntity signUp(MultipartFile image,SignUpRequest signUpRequest){
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        String imagePath = cloudinaryService.uploadFile(image);
        // Create new user's account
        User user = new User(
                imagePath,
                signUpRequest.getFirstName(),
                signUpRequest.getFirstName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        String strRole = signUpRequest.getRole();
        if (strRole == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);
        } else {
            switch (signUpRequest.getRole().toLowerCase()) {
                case "admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.setRole(adminRole);
                    break;
                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.setRole(userRole);
            }
        }

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");

    }

    public ResponseEntity<?> edit(Long id, SignUpRequest signUpRequest) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            try{
                if(Objects.nonNull(signUpRequest.getImage())){
                    if(Objects.nonNull(user.get().getImagePath()))
                        cloudinaryService.delete(user.get().getImagePath());
                    String imagePath = cloudinaryService.uploadFile(signUpRequest.getImage());
                    user.get().setImagePath(imagePath);
                }
                user.get().setPassword(encoder.encode(signUpRequest.getPassword()));
                user.get().setEmail(signUpRequest.getEmail());
                user.get().setFirstName(signUpRequest.getFirstName());
                if(signUpRequest.getRole().equalsIgnoreCase("admin")){
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.get().setRole(adminRole);
                }else{
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    user.get().setRole(userRole);
                }
                user.get().setLastName(signUpRequest.getFirstName());
                User savedUser = userRepository.save(user.get());
                return ResponseEntity.ok(savedUser);
            }catch(Exception exception){
                return new ResponseEntity<>( exception.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<>( "User Not Found", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> delete(Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            if(Objects.nonNull(user.get().getImagePath()))
                cloudinaryService.delete(user.get().getImagePath());
            userRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }else{
            return new ResponseEntity<>( "Not Found",HttpStatus.BAD_REQUEST);
        }
    }
}
