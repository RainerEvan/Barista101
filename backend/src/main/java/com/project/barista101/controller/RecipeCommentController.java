package com.project.barista101.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.model.recipe.RecipeComments;
import com.project.barista101.payload.request.RecipeCommentRequest;
import com.project.barista101.service.RecipeCommentService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/recipe-comment")
@AllArgsConstructor
public class RecipeCommentController {
    @Autowired
    private final RecipeCommentService recipeCommentService;
    
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addRecipeComment(@RequestBody RecipeCommentRequest recipeCommentRequest){
        try{
            RecipeComments recipeComment = recipeCommentService.addRecipeComment(recipeCommentRequest);

            return ResponseHandler.generateResponse("Recipe comment has been added successfully!", HttpStatus.OK, recipeComment);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteRecipeComment(@RequestParam("recipeCommentId") UUID recipeCommentId){
        try{
            recipeCommentService.deleteRecipeComment(recipeCommentId);

            return ResponseHandler.generateResponse("Recipe comment has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
