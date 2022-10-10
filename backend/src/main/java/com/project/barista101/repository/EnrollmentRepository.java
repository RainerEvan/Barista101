package com.project.barista101.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.Accounts;
import com.project.barista101.model.Enrollments;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollments,UUID> {
    List<Enrollments> findAllByAccount(Accounts account);
}
