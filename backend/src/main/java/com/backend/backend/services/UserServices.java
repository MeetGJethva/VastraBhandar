package com.backend.backend.services;

import com.backend.backend.models.User;
import com.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    private UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServices(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        if(userRepo.existsByEmail(user.getEmail())) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
}