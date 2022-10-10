package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.ProgressService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/progress")
@AllArgsConstructor
public class ProgressController {
    
    @Autowired
    private final ProgressService progressService;
}
