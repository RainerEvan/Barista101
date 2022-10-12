package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Modules;
import com.project.barista101.model.Sections;
import com.project.barista101.repository.ModuleRepository;
import com.project.barista101.repository.SectionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SectionService {

    @Autowired
    private final SectionRepository sectionRepository;
    @Autowired
    private final ModuleRepository moduleRepository;

    @Transactional
    public List<Sections> getAllSectionsForModule(UUID moduleId){
        Modules module = moduleRepository.findById(moduleId)
            .orElseThrow(() -> new IllegalStateException("module with current id cannot be found"));

        return sectionRepository.findAllByModule(module);
    }

    @Transactional
    public Sections getSection(UUID sectionId){
        return sectionRepository.findById(sectionId)
            .orElseThrow(() -> new IllegalStateException("Section with current id cannot be found"));
    }

    @Transactional
    public Sections addSection(){

        Sections section = new Sections();

        return section;
    }
}
