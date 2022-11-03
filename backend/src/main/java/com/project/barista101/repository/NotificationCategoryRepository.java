package com.project.barista101.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.notification.NotificationCategories;

@Repository
public interface NotificationCategoryRepository extends JpaRepository<NotificationCategories,UUID>{
    
}
