package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Courses;
import com.project.barista101.model.Modules;
import com.project.barista101.repository.CourseRepository;
import com.project.barista101.repository.ModuleRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ModuleService {
    
    @Autowired
    private final ModuleRepository moduleRepository;
    @Autowired
    private final CourseRepository courseRepository;

    @Transactional
    public List<Modules> getAllModulesForCourse(UUID courseId){
        Courses course = courseRepository.findById(courseId)
            .orElseThrow(() -> new IllegalStateException("Course with current id cannot be found"));

        return moduleRepository.findAllByCourse(course);
    }

    @Transactional
    public Modules getModule(UUID moduleId){
        return moduleRepository.findById(moduleId)
            .orElseThrow(() -> new IllegalStateException("Module with current id cannot be found"));
    }

    @Transactional
    public Modules addModule(){

        Modules module = new Modules();

        return module;
    }
}
