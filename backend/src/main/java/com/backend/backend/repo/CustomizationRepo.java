package com.backend.backend.repo;

import com.backend.backend.models.Customization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomizationRepo extends MongoRepository<Customization, String> {
}
