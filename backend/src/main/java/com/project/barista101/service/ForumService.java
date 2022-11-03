package com.project.barista101.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.forum.Forums;
import com.project.barista101.payload.request.ForumRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.ForumRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ForumService {

    @Autowired
    private final ForumRepository forumRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<Forums> getAllForums(){
        return forumRepository.findAll();
    }

    @Transactional
    public Forums getforum(UUID forumId){
        return forumRepository.findById(forumId)
            .orElseThrow(() -> new IllegalStateException("Forum with current id cannot be found"));
    }
    
    @Transactional
    public List<Forums> getAllForumsForAccount(UUID accountId){
        Accounts account = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        return forumRepository.findAllByAccount(account);
    }

    @Transactional
    public Forums addForum(ForumRequest forumRequest){
        Accounts account = accountRepository.findById(forumRequest.getAccountId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        Forums forum = new Forums();
        forum.setAuthor(account);
        forum.setTitle(forumRequest.getTitle());
        forum.setBody(forumRequest.getBody());
        forum.setCreatedAt(OffsetDateTime.now());

        return forumRepository.save(forum);
    }

    @Transactional
    public void deleteForum(UUID forumId){
        Forums forum = forumRepository.findById(forumId)
            .orElseThrow(() -> new IllegalStateException("Forum with current id cannot be found"));

        forumRepository.delete(forum);
    }
}
