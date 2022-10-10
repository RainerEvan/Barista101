package com.project.barista101.resolver.Enrollments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.EnrollmentService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EnrollmentQueryResolver {
    
    @Autowired
    private final EnrollmentService enrollmentService;
}
