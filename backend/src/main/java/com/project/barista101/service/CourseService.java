package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Courses;
import com.project.barista101.repository.CourseRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseService {
    
    @Autowired
    private final CourseRepository courseRepository;

    @Transactional
    public List<Courses> getAllCourses(){
        return courseRepository.findAll();
    }

    @Transactional
    public Courses getCourse(UUID courseId){
        return courseRepository.findById(courseId)
            .orElseThrow(() -> new IllegalStateException("Course with current id cannot be found"));
    }

    @Transactional
    public Courses addCourse(){

        Courses course = new Courses();

        return course;
    }
}
