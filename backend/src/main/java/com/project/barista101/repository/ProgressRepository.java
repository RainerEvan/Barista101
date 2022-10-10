package com.project.barista101.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.Enrollments;
import com.project.barista101.model.Progress;

@Repository
public interface ProgressRepository extends JpaRepository<Progress,UUID> {
    List<Progress> findAllByEnrollment(Enrollments enrollment);
}
