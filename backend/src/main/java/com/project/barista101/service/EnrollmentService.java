package com.project.barista101.service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Enrollments;
import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.EnrollmentRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.CourseRepository;
import com.project.barista101.repository.EnrollmentRepository;
import com.project.barista101.repository.ModuleRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class EnrollmentService {
    
    @Autowired
    private final EnrollmentRepository enrollmentRepository;
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private final CourseRepository courseRepository;
    @Autowired
    private final ModuleRepository moduleRepository;

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

        List<Modules> moduleList = moduleRepository.findAllByCourseOrderByCreatedAtAsc(course);

        JSONArray modules = new JSONArray();
        
        moduleList.stream().forEach(
            (moduleObject) -> {
                JSONObject module = new JSONObject();
                module.put("moduleId", moduleObject.getId().toString());
                module.put("done", false);
                modules.put(module);
            }
        );

        JSONObject progress = new JSONObject();
        progress.put("percentage",0);
        progress.put("modules", modules);

        enrollment.setProgress(progress.toString());

        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public String finishModule(UUID enrollmentId, UUID moduleId){
        Enrollments enrollment = getEnrollment(enrollmentId);

        JSONObject progress = new JSONObject(enrollment.getProgress());

        JSONArray modules = progress.getJSONArray("modules");
        modules.iterator().forEachRemaining(
            (moduleObject) -> {
                JSONObject module = new JSONObject(moduleObject.toString());
                if(module.get("moduleId").equals(moduleId.toString())){
                    module.remove("done");
                    module.put("done", true);
                } 
            }
        );

        enrollment.setProgress(progress.toString());

        return progress.toString();
        // return enrollmentRepository.save(enrollment);
    }
}
