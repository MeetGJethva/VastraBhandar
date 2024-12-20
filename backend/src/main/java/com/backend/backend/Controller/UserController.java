package com.backend.backend.Controller;

import com.backend.backend.models.User;
import com.backend.backend.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserServices userServices;

    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userServices.getAllUsers();
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        user = userServices.addUser(user);
        System.out.println(user.getPassword());
        return user;
    }
}
