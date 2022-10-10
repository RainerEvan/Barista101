package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.ModuleService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/module")
@AllArgsConstructor
public class ModuleController {
    
    @Autowired
    private final ModuleService moduleService;
}
