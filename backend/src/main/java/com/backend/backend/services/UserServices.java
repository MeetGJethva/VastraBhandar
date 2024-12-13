package com.backend.backend.services;

import com.backend.backend.models.User;
import com.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    private UserRepo userRepo;

    @Autowired
    public UserServices(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
