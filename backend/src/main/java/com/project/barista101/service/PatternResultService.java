package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.latteart.PatternResults;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.PatternResultRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PatternResultService {

    @Autowired
    private final PatternResultRepository patternResultRepository;
    @Autowired
    private final AccountRepository accountRepository;
    
    @Transactional
    public List<PatternResults> getAllPatternResultsForAccount(UUID accountId){
        Accounts account = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        return patternResultRepository.findAllByAccount(account);
    }

    @Transactional
    public PatternResults getPatternResult(UUID PatternResultId){
        return patternResultRepository.findById(PatternResultId)
            .orElseThrow(() -> new IllegalStateException("PatternResult with current id cannot be found"));
    }
}
