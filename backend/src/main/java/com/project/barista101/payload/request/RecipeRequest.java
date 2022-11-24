package com.project.barista101.payload.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecipeRequest {
    private UUID categoryId;
    private UUID accountId;
    private String title;
    private String description;
    private String ingredients;
    private String instructions;
    private String notes;
}
