package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.ModuleRequest;
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
    public Modules addModule(ModuleRequest moduleRequest){
        Courses course = courseRepository.findById(moduleRequest.getCourseId())
            .orElseThrow(() -> new IllegalStateException("Course with current id cannot be found"));

        Modules module = new Modules();
        module.setCourse(course);
        module.setTitle(moduleRequest.getTitle());

        return moduleRepository.save(module);
    }

    @Transactional
    public void deleteModule(UUID moduleId){
        Modules module = moduleRepository.findById(moduleId)
            .orElseThrow(() -> new IllegalStateException("Module with current id cannot be found"));

        moduleRepository.delete(module);
    }
}
