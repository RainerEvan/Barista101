package com.project.barista101.service;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.recipe.RecipeCategories;
import com.project.barista101.model.recipe.Recipes;
import com.project.barista101.payload.request.RecipeRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.RecipeCategoryRepository;
import com.project.barista101.repository.RecipeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RecipeService {
    
    @Autowired
    private final RecipeRepository recipeRepository;
    @Autowired
    private final RecipeCategoryRepository recipeCategoryRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<Recipes> getAllRecipes(){
        return recipeRepository.findAll();
    }

    @Transactional
    public Recipes getRecipe(UUID recipeId){
        return recipeRepository.findById(recipeId)
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));
    }
    
    @Transactional
    public List<Recipes> getAllRecipesForAccount(UUID accountId){
        Accounts account = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        return recipeRepository.findAllByAuthor(account);
    }

    @Transactional
    public Recipes addRecipe(MultipartFile file, RecipeRequest recipeRequest){
        RecipeCategories recipeCategory = recipeCategoryRepository.findById(recipeRequest.getCategoryId())
            .orElseThrow(() -> new IllegalStateException("Category with current id cannot be found"));

        Accounts account = accountRepository.findById(recipeRequest.getAccountId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        Recipes recipe = new Recipes();
        recipe.setCategory(recipeCategory);
        recipe.setAuthor(account);
        recipe.setTitle(recipeRequest.getTitle());
        recipe.setDescription(recipeRequest.getDescription());
        recipe.setIngredients(recipeRequest.getIngredients());
        recipe.setInstructions(recipeRequest.getInstructions());
        recipe.setNotes(recipeRequest.getNotes());
        recipe.setThumbnail(addImage(file));
        recipe.setCreatedAt(OffsetDateTime.now());

        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(UUID recipeId){
        Recipes recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new IllegalStateException("Recipe with current id cannot be found"));

        recipeRepository.delete(recipe);
    }

    public String addImage(MultipartFile file){
        try{
            String encodedString = Base64.getEncoder().encodeToString(file.getBytes());

            return encodedString;
            
        } catch (IOException exception){
            throw new IllegalStateException("Could not add the current file", exception);
        }
    }
}
