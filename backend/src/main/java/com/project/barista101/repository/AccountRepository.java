package com.project.barista101.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.Accounts;

@Repository
public interface AccountRepository extends JpaRepository<Accounts,UUID>{

    boolean existsByEmail(String email);
    
}
