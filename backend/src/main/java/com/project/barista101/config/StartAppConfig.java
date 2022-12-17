package com.project.barista101.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.project.barista101.data.ERoles;
import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.account.Roles;
import com.project.barista101.model.course.Contents;
import com.project.barista101.model.course.Courses;
import com.project.barista101.model.course.Enrollments;
import com.project.barista101.model.course.Modules;
import com.project.barista101.model.forum.ForumComments;
import com.project.barista101.model.forum.Forums;
import com.project.barista101.model.notification.Notifications;
import com.project.barista101.model.recipe.RecipeCategories;
import com.project.barista101.model.recipe.RecipeRatings;
import com.project.barista101.model.recipe.Recipes;
import com.project.barista101.payload.request.ContentRequest;
import com.project.barista101.payload.request.CourseRequest;
import com.project.barista101.payload.request.EnrollmentRequest;
import com.project.barista101.payload.request.ForumCommentRequest;
import com.project.barista101.payload.request.ForumRequest;
import com.project.barista101.payload.request.ModuleRequest;
import com.project.barista101.payload.request.NotificationRequest;
import com.project.barista101.payload.request.RecipeRatingRequest;
import com.project.barista101.payload.request.RecipeRequest;
import com.project.barista101.payload.request.SignupRequest;
import com.project.barista101.repository.RoleRepository;
import com.project.barista101.service.AccountService;
import com.project.barista101.service.ContentService;
import com.project.barista101.service.CourseService;
import com.project.barista101.service.EnrollmentService;
import com.project.barista101.service.ForumCommentService;
import com.project.barista101.service.ForumService;
import com.project.barista101.service.ModuleService;
import com.project.barista101.service.NotificationService;
import com.project.barista101.service.RecipeCategoryService;
import com.project.barista101.service.RecipeRatingService;
import com.project.barista101.service.RecipeService;

@Configuration
public class StartAppConfig {
    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository, AccountService accountService, CourseService courseService, ModuleService moduleService, ContentService contentService, EnrollmentService enrollmentService, ForumService forumService, ForumCommentService forumCommentService, RecipeService recipeService, RecipeCategoryService recipeCategoryService, RecipeRatingService recipeRatingService, NotificationService notificationService){
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

            EnrollmentRequest enrollmentRequest = new EnrollmentRequest(account.getId(), course1.getId());
            Enrollments enrollment1 = enrollmentService.addEnrollment(enrollmentRequest);
            
            ForumRequest forumRequest1 = new ForumRequest(account.getId(), "Tips For Making Cold Brew Coffee", "<p>Cold brew is simply coffee that has been brewed with cold rather than hot water and usually involves a long steeping process—anywhere between 12-24 hours. In terms of flavor, cold brew is generally characterized as smooth, low-acid, and heavier than its hot brewed counterparts.<br><br>Although cold brew has been around for centuries, it’s really in the last ten years that it’s become a staple on coffee shops menus and recognizable by most coffee drinkers</p>");
            Forums forum1 = forumService.addForum(forumRequest1);
           
            ForumRequest forumRequest2 = new ForumRequest(account.getId(), "The Best Coffee in Bali", "<p>Most coffee plants are grown around what’s known as ‘the bean belt’, an area around the equator between the tropics of Capricorn and Cancer. It’s here that’s home to the coffee capitals of the world such as Brazil, Vietnam, Colombia, Indonesia and Ethiopia, as these are the locations with the perfect conditions for coffee plants to thrive.</p><br><p>Interestingly, the location of where coffee beans are grown can alter the taste. Things such as climate, elevation and even soil type can impact the flavour of the coffee the beans produce.</p>");
            Forums forum2 = forumService.addForum(forumRequest2);

            ForumCommentRequest forumCommentRequest1 = new ForumCommentRequest(forum2.getId(), account.getId(), "Agreed, what a great information about coffee in Indonesia");
            ForumComments forumComment1 = forumCommentService.addForumComment(forumCommentRequest1);

            ForumCommentRequest forumCommentRequest2 = new ForumCommentRequest(forum2.getId(), account.getId(), "Really inspiring stuff");
            ForumComments forumComment2 = forumCommentService.addForumComment(forumCommentRequest2);

            RecipeCategories category1 = recipeCategoryService.addRecipeCategory("Cocktail");
            RecipeCategories category2 = recipeCategoryService.addRecipeCategory("Frappucino");
            RecipeCategories category3 = recipeCategoryService.addRecipeCategory("Manual Brew");

            RecipeRequest recipeRequest1 = new RecipeRequest(category1.getId(), account.getId(), "Martini", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe voluptates, nesciunt consequuntur deleniti tempore molestias, necessitatibus temporibus ratione in sint quisquam. Quos velit unde ad ab vel aut, aspernatur eius.", "[{\"item\":\"Glass\"},{\"item\":\"Shaker\"},{\"item\":\"Spoon\"}]", "[{\"item\":\"Wshikey\"},{\"item\":\"Lemon Juice\"},{\"item\":\"Soda Water\"}]", "[{\"item\":\"Pour 30 ml of whiskey into the shaker\"},{\"item\":\"Squeeze 20 ml of lemon and add the juice into the shaker\"},{\"item\":\"Add 5 pcs of ice cubes into the shaker\"}]", "Lorem ipsum, dolor sit amet consectetur adipisicing elit.");
            Recipes recipe1 = recipeService.addRecipe(null, recipeRequest1);
            
            RecipeRequest recipeRequest2 = new RecipeRequest(category1.getId(), account.getId(), "Negroni", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe voluptates, nesciunt consequuntur deleniti tempore molestias, necessitatibus temporibus ratione in sint quisquam. Quos velit unde ad ab vel aut, aspernatur eius.", "[{\"item\":\"Glass\"},{\"item\":\"Shaker\"},{\"item\":\"Spoon\"}]", "[{\"item\":\"Wshikey\"},{\"item\":\"Lemon Juice\"},{\"item\":\"Soda Water\"}]", "[{\"item\":\"Pour 30 ml of whiskey into the shaker\"},{\"item\":\"Squeeze 20 ml of lemon and add the juice into the shaker\"},{\"item\":\"Add 5 pcs of ice cubes into the shaker\"}]", "Lorem ipsum, dolor sit amet consectetur adipisicing elit.");
            Recipes recipe2 = recipeService.addRecipe(null, recipeRequest2);
            
            RecipeRequest recipeRequest3 = new RecipeRequest(category1.getId(), account.getId(), "Whiskey Sour", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe voluptates, nesciunt consequuntur deleniti tempore molestias, necessitatibus temporibus ratione in sint quisquam. Quos velit unde ad ab vel aut, aspernatur eius.", "[{\"item\":\"Glass\"},{\"item\":\"Shaker\"},{\"item\":\"Spoon\"}]", "[{\"item\":\"Wshikey\"},{\"item\":\"Lemon Juice\"},{\"item\":\"Soda Water\"}]", "[{\"item\":\"Pour 30 ml of whiskey into the shaker\"},{\"item\":\"Squeeze 20 ml of lemon and add the juice into the shaker\"},{\"item\":\"Add 5 pcs of ice cubes into the shaker\"}]", "Lorem ipsum, dolor sit amet consectetur adipisicing elit.");
            Recipes recipe3 = recipeService.addRecipe(null, recipeRequest3);

            RecipeRatingRequest recipeRatingRequest1 = new RecipeRatingRequest(recipe3.getId(), account.getId(), 5, "This is a great recipe");
            RecipeRatings recipeRating1 = recipeRatingService.addRecipeRating(recipeRatingRequest1);

            RecipeRatingRequest recipeRatingRequest2 = new RecipeRatingRequest(recipe3.getId(), account.getId(), 4, "Not bad for a mocktail");
            RecipeRatings recipeRating2 = recipeRatingService.addRecipeRating(recipeRatingRequest2);

            RecipeRatingRequest recipeRatingRequest3 = new RecipeRatingRequest(recipe3.getId(), account.getId(), 4, "Great recipe here");
            RecipeRatings recipeRating3 = recipeRatingService.addRecipeRating(recipeRatingRequest3);

            NotificationRequest notificationRequest1 = new NotificationRequest(account.getId(), "Congratulations you have completed the module", "");
            Notifications notification1 = notificationService.addNotification(notificationRequest1);
        };
    }
}
