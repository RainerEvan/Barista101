package com.project.barista101.resolver.Contents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.ContentService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ContentQueryResolver {
    
    @Autowired
    private final ContentService contentService;
}
