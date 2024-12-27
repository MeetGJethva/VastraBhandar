package com.backend.backend.services;

import com.backend.backend.models.User;
import com.backend.backend.models.UserPrincipals;
import com.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private UserRepo userRepo;

    @Autowired
    public MyUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String useremail) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(useremail);

        if(user == null) {
            System.out.println("User not found");
            throw new UsernameNotFoundException(useremail);
        }

        return new UserPrincipals(user);
    }
}
