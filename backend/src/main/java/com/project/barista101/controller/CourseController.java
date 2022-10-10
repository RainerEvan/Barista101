package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.CourseService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/course")
@AllArgsConstructor
public class CourseController {
    
    @Autowired
    private final CourseService courseService;
}
