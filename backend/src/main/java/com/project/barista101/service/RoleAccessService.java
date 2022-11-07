package com.project.barista101.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.RoleAccess;
import com.project.barista101.repository.RoleAccessRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoleAccessService {
    
    @Autowired
    private final RoleAccessRepository roleAccessRepository;

    @Transactional
    public List<RoleAccess> getAllRoleAccess(){
        return roleAccessRepository.findAll();
    }
}
