package com.project.barista101.resolver.PatternResults;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.model.latteart.PatternResults;
import com.project.barista101.service.PatternResultService;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PatternResultQueryResolver implements GraphQLQueryResolver{
    
    @Autowired
    private final PatternResultService patternResultService;

    public List<PatternResults> getAllPatternResultsForAccount(UUID accountId){
        return patternResultService.getAllPatternResultsForAccount(accountId);
    }

    public PatternResults getPatternResult(UUID patternResultId){
        return patternResultService.getPatternResult(patternResultId);
    }
}
