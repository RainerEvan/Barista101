package com.project.barista101.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.recipe.RecipeComments;
import com.project.barista101.model.recipe.Recipes;
import com.project.barista101.payload.request.RecipeCommentRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.RecipeCommentRepository;
import com.project.barista101.repository.RecipeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RecipeCommentService {
    
    @Autowired
    private final RecipeCommentRepository recipeCommentRepository;
    @Autowired
    private final RecipeRepository recipeRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<RecipeComments> getAllCommentsForRecipe(UUID recipeId){
        Recipes recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));

        return recipeCommentRepository.findAllByRecipeOrderByCreatedAtDesc(recipe);
    }

    @Transactional
    public RecipeComments addRecipeComment(RecipeCommentRequest recipeCommentRequest){
        Recipes recipe = recipeRepository.findById(recipeCommentRequest.getRecipeId())
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));

        Accounts account = accountRepository.findById(recipeCommentRequest.getAccountId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        RecipeComments recipeComment = new RecipeComments();
        recipeComment.setRecipe(recipe);
        recipeComment.setAuthor(account);
        recipeComment.setBody(recipeCommentRequest.getBody());
        recipeComment.setCreatedAt(OffsetDateTime.now());

        return recipeCommentRepository.save(recipeComment);
    }

    @Transactional
    public void deleteRecipeComment(UUID recipeCommentId){
        RecipeComments recipeComment = recipeCommentRepository.findById(recipeCommentId)
            .orElseThrow(() -> new IllegalStateException("Recipe comment with current id cannot be found"));

        recipeCommentRepository.delete(recipeComment);
    }
}
