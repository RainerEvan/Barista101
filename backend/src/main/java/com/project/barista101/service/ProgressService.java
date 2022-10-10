package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Enrollments;
import com.project.barista101.model.Progress;
import com.project.barista101.repository.EnrollmentRepository;
import com.project.barista101.repository.ProgressRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProgressService {
    
    @Autowired
    private final ProgressRepository progressRepository;
    @Autowired
    private final EnrollmentRepository enrollmentRepository;

    @Transactional
    public List<Progress> getProgressForEnrollment(UUID enrollmentId){
        Enrollments enrollment = enrollmentRepository.findById(enrollmentId)
            .orElseThrow(() -> new IllegalStateException("Enrollment with current id cannot be found"));

        return progressRepository.findAllByEnrollment(enrollment);
    }

    @Transactional
    public Progress getProgress(UUID progressId){
        return progressRepository.findById(progressId)
            .orElseThrow(() -> new IllegalStateException("Progress with current id cannot be found"));
    }

    @Transactional
    public Progress addProgress(){
        
        Progress progress = new Progress();

        return progress;
    }
}
