package com.project.barista101.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.project.barista101.data.ERoles;
import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.account.Roles;
import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.CourseRequest;
import com.project.barista101.payload.request.ModuleRequest;
import com.project.barista101.payload.request.SignupRequest;
import com.project.barista101.repository.RoleRepository;
import com.project.barista101.service.AccountService;
import com.project.barista101.service.CourseService;
import com.project.barista101.service.ModuleService;

@Configuration
public class StartAppConfig {
    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, AccountService accountService, CourseService courseService, ModuleService moduleService){
        return args -> {

            Roles role1 = new Roles();
            role1.setName(ERoles.ADMIN);
            roleRepository.save(role1);

            Roles role2 = new Roles();
            role2.setName(ERoles.USER);
            roleRepository.save(role2);
            
            SignupRequest signupRequest = new SignupRequest("rainerevan@gmail.com", "Rainer Evan", "rainerevan", "pass123");
            Accounts account = accountService.addAccount(signupRequest);

            CourseRequest courseRequest1 = new CourseRequest("Beans", "Learn about the coffee beans and how they are being an important factor for your cup of coffee");
            Courses course1 = courseService.addCourse(null, courseRequest1);

            ModuleRequest moduleRequest1 = new ModuleRequest(course1.getId(), "Beans Origin");
            Modules module1 = moduleService.addModule(null, moduleRequest1);

            ModuleRequest moduleRequest2 = new ModuleRequest(course1.getId(), "Post Prcoessing");
            Modules module2 = moduleService.addModule(null, moduleRequest2);
            
            ModuleRequest moduleRequest3 = new ModuleRequest(course1.getId(), "Roasting");
            Modules module3 = moduleService.addModule(null, moduleRequest3);
        };
    }
}
