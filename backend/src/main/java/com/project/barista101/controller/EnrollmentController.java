package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.EnrollmentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/enrollment")
@AllArgsConstructor
public class EnrollmentController {
    
    @Autowired
    private final EnrollmentService enrollmentService;
}
