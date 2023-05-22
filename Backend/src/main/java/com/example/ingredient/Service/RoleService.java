package com.example.ingredient.Service;

import com.example.ingredient.Model.ERole;
import com.example.ingredient.Model.Role;
import com.example.ingredient.Repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public void init(){
        ERole[] allRoles = ERole.class.getEnumConstants();
        Arrays.stream(allRoles).forEach(
                eRole -> {
                    Optional<Role> role= roleRepository.findByName(eRole);
                    if(role.isEmpty())
                    {
                        Role newRole = new Role();
                        newRole.setName(eRole);
                        roleRepository.save(newRole);
                    }
                }
        );
    }
}
