package com.project.barista101.resolver.Progress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.ProgressService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ProgressQueryResolver {
    
    @Autowired
    private final ProgressService progressService;
}
