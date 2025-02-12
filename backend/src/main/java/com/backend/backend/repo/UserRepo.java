package com.backend.backend.repo;

import com.backend.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, Long> {

    boolean existsByEmail(String email);
    User findByName(String username);
    User findByEmail(String email);
}
