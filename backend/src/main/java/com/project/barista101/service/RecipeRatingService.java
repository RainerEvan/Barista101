package com.project.barista101.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.recipe.RecipeRatings;
import com.project.barista101.model.recipe.Recipes;
import com.project.barista101.payload.request.RecipeRatingRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.RecipeRatingRepository;
import com.project.barista101.repository.RecipeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RecipeRatingService {
    
    @Autowired
    private final RecipeRatingRepository recipeRatingRepository;
    @Autowired
    private final RecipeRepository recipeRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<RecipeRatings> getAllRatingsForRecipe(UUID recipeId){
        Recipes recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));

        return recipeRatingRepository.findAllByRecipe(recipe);
    }

    @Transactional
    public RecipeRatings addRecipeRating(RecipeRatingRequest recipeRatingRequest){
        Recipes recipe = recipeRepository.findById(recipeRatingRequest.getRecipeId())
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));

        Accounts account = accountRepository.findById(recipeRatingRequest.getAccountId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        RecipeRatings recipeRating = new RecipeRatings();
        recipeRating.setRecipe(recipe);
        recipeRating.setAccount(account);
        recipeRating.setRating(recipeRatingRequest.getRating());
        recipeRating.setBody(recipeRatingRequest.getBody());

        return recipeRatingRepository.save(recipeRating);
    }

    @Transactional
    public void deleteRecipeRating(UUID recipeRatingId){
        RecipeRatings recipeRating = recipeRatingRepository.findById(recipeRatingId)
            .orElseThrow(() -> new IllegalStateException("Recipe rating with current id cannot be found"));

        recipeRatingRepository.delete(recipeRating);
    }

    @Transactional
    public String calculateRatingForRecipe(UUID recipeId){
        List<RecipeRatings> recipeRatings = getAllRatingsForRecipe(recipeId);

        double totalRating = 0;

        for(RecipeRatings recipeRating:recipeRatings){
            double rating = recipeRating.getRating();

            totalRating += rating;
        }

        double percentage = totalRating/recipeRatings.size();

        BigDecimal bd = new BigDecimal(Double.toString(percentage));
        bd = bd.setScale(1, RoundingMode.HALF_UP);

        String finalRate = bd.toString();

        return finalRate;
    }
}
