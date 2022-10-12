package com.project.barista101.resolver.Sections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.SectionService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SectionQueryResolver {
    
    @Autowired
    private final SectionService sectionService;
}
