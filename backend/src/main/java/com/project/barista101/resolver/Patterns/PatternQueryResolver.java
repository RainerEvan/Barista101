package com.project.barista101.resolver.Patterns;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.model.latteart.Patterns;
import com.project.barista101.service.PatternService;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PatternQueryResolver implements GraphQLQueryResolver{
    
    @Autowired
    private final PatternService patternService;

    public List<Patterns> getAllPatterns(){
        return patternService.getAllPatterns();
    }

    public Patterns getPattern(UUID patternId){
        return patternService.getPattern(patternId);
    }
}
