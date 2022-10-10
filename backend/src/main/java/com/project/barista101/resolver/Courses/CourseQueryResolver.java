package com.project.barista101.resolver.Courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.CourseService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CourseQueryResolver {
    
    @Autowired
    private final CourseService courseService;
}
