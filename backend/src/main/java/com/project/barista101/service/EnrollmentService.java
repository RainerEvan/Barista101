package com.project.barista101.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Enrollments;
import com.project.barista101.payload.request.EnrollmentRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.CourseRepository;
import com.project.barista101.repository.EnrollmentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EnrollmentService {
    
    @Autowired
    private final EnrollmentRepository enrollmentRepository;
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private final CourseRepository courseRepository;

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
    public Enrollments addEnrollment(EnrollmentRequest enrollmentRequest){
        Accounts account = accountRepository.findById(enrollmentRequest.getAccountId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        Courses course = courseRepository.findById(enrollmentRequest.getCourseId())
            .orElseThrow(() -> new IllegalStateException("Course with current id cannot be found"));

        Enrollments enrollment = new Enrollments();
        enrollment.setAccount(account);
        enrollment.setCourse(course);
        enrollment.setStartDate(OffsetDateTime.now());
        enrollment.setIsCompleted(false);

        return enrollmentRepository.save(enrollment);
    }

}
