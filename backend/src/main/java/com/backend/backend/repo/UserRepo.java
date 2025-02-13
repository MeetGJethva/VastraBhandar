package com.backend.backend.repo;

import com.backend.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
    Optional<User> findByName(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(String userId);
}
