package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.SectionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/section")
@AllArgsConstructor
public class SectionController {
    
    @Autowired
    private final SectionService sectionService;
}
