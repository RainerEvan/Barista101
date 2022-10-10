package com.project.barista101.resolver.Modules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.ModuleService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ModuleQueryResolver {
    
    @Autowired
    private final ModuleService moduleService;
}
