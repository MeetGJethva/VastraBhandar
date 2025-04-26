package com.backend.backend.Controller;

import com.backend.backend.models.User;
import com.backend.backend.services.LoginRequest;
import com.backend.backend.services.UserServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
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
    public ResponseEntity<?> signup(@RequestBody User user) {

        try {
            User newUser = userServices.addUser(user);
            System.out.println(newUser);
            if (newUser == null) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
//            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error during signup: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userServices.getUserByEmail(loginRequest.getEmail());
            if(user == null ||
                    !userServices.matchPassword(loginRequest.getPassword(), user.getPassword())) {
                throw new Exception();
            }

            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
