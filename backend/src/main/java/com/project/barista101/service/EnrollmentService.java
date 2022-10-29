package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.course.Enrollments;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.EnrollmentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EnrollmentService {
    
    @Autowired
    private final EnrollmentRepository enrollmentRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<Enrollments> getAllEnrollmentsForAccount(UUID accountId){
        Accounts account = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        return enrollmentRepository.findAllByAccount(account);
    }

    @Transactional
    public Enrollments getEnrollment(UUID enrollmentId){
        return enrollmentRepository.findById(enrollmentId)
            .orElseThrow(() -> new IllegalStateException("Enrollment with current id cannot be found"));
    }

    @Transactional
    public Enrollments addEnrollment(){

        Enrollments enrollment = new Enrollments();

        return enrollment;
    }
}
