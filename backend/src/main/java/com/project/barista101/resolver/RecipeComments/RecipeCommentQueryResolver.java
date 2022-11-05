package com.project.barista101.resolver.RecipeComments;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.model.recipe.RecipeComments;
import com.project.barista101.service.RecipeCommentService;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class RecipeCommentQueryResolver implements GraphQLQueryResolver{
    
    @Autowired
    private final RecipeCommentService recipeCommentService;

    public List<RecipeComments> getAllCommentsForRecipe(UUID recipeId){
        return recipeCommentService.getAllCommentsForRecipe(recipeId);
    }
}
