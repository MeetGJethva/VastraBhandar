package com.backend.backend.services;

import com.backend.backend.models.Customization;
import com.backend.backend.repo.CustomizationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomizationService {

    private CustomizationRepo repo;

    @Autowired
    public CustomizationService(CustomizationRepo repo) {
        this.repo = repo;
    }

    public Customization addCustomization(Customization customization) {
        return repo.save(customization);
    }
}
