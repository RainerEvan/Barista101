package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.ContentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/content")
@AllArgsConstructor
public class ContentController {
    
    @Autowired
    private final ContentService contentService;
}
