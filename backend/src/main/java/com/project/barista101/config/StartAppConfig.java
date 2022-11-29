package com.project.barista101.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.project.barista101.data.ERoles;
import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.account.Roles;
import com.project.barista101.model.course.Contents;
import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.ContentRequest;
import com.project.barista101.payload.request.CourseRequest;
import com.project.barista101.payload.request.ModuleRequest;
import com.project.barista101.payload.request.SignupRequest;
import com.project.barista101.repository.RoleRepository;
import com.project.barista101.service.AccountService;
import com.project.barista101.service.ContentService;
import com.project.barista101.service.CourseService;
import com.project.barista101.service.ModuleService;

@Configuration
public class StartAppConfig {
    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, AccountService accountService, CourseService courseService, ModuleService moduleService, ContentService contentService){
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

            ContentRequest contentRequest1 = new ContentRequest(module1.getId(), "Where do coffee beans come from?", "<p>Coffee beans come from the coffee plant, a bush-like plant which can get very tall (coffee farmers will usually keep them trimmed to around 5ft to keep them manageable). On these coffee plants, bunches of cherries grow and inside these you’ll find two coffee beans, Arabica and Robusta coffee</p>");
            Contents content1 = contentService.addContent(contentRequest1);

            ContentRequest contentRequest2 = new ContentRequest(module1.getId(), "When is the coffee plant is ready?","<p>On average, it takes around one year for the coffee plant to begin to produce fragrant, white flowers, then up to four years later before it begins to bear fruit. It will be around 10 years for the coffee plants to begin producing coffee beans on a commercial level, which are the ones of the most value to the farmers. The general lifespan of the coffee plant will be between 30 to 40 years but they can live much longer depending on the care given!</p><br><p>Once they're ripe and ready for picking they'll turn red in colour, but it takes a keen eye to know when the berries are ready for harvest as picking too early or too late can have a huge impact on the final taste.</p>");
            Contents content2 = contentService.addContent(contentRequest2);

            ContentRequest contentRequest3 = new ContentRequest(module1.getId(), "Where is coffee grown?", "<p>Most coffee plants are grown around what’s known as ‘the bean belt’, an area around the equator between the tropics of Capricorn and Cancer. It’s here that’s home to the coffee capitals of the world such as Brazil, Vietnam, Colombia, Indonesia and Ethiopia, as these are the locations with the perfect conditions for coffee plants to thrive.</p><br><p>Interestingly, the location of where coffee beans are grown can alter the taste. Things such as climate, elevation and even soil type can impact the flavour of the coffee the beans produce.</p>");
            Contents content3 = contentService.addContent(contentRequest3);

            ModuleRequest moduleRequest2 = new ModuleRequest(course1.getId(), "Post Processing");
            Modules module2 = moduleService.addModule(null, moduleRequest2);
            
            ModuleRequest moduleRequest3 = new ModuleRequest(course1.getId(), "Roasting");
            Modules module3 = moduleService.addModule(null, moduleRequest3);
        };
    }
}
