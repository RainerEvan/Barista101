package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.latteart.Patterns;
import com.project.barista101.payload.request.PatternRequest;
import com.project.barista101.repository.PatternRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PatternService {
    
    @Autowired
    private final PatternRepository patternRepository;

    @Transactional
    public List<Patterns> getAllPatterns(){
        return patternRepository.findAll();
    }

    @Transactional
    public Patterns getPattern(UUID patternId){
        return patternRepository.findById(patternId)
            .orElseThrow(() -> new IllegalStateException("Pattern with current id cannot be found"));
    }

    @Transactional
    public Patterns addPattern(PatternRequest patternRequest){
        Patterns pattern = new Patterns();
        pattern.setName(patternRequest.getName());
        pattern.setPatternImg(patternRequest.getPatternImg());

        return patternRepository.save(pattern);
    }

    @Transactional
    public void deletePattern(UUID patternId){
        Patterns pattern = patternRepository.findById(patternId)
            .orElseThrow(() -> new IllegalStateException("Pattern with current id cannot be found"));

        patternRepository.delete(pattern);
    }
}
