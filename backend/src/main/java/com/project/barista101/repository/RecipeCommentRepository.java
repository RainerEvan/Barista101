package com.project.barista101.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.recipe.RecipeComments;
import com.project.barista101.model.recipe.Recipes;

@Repository
public interface RecipeCommentRepository extends JpaRepository<RecipeComments,UUID>{
    List<RecipeComments> findAllByRecipeOrderByCreatedAtDesc(Recipes recipe);
}
