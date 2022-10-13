package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Contents;
import com.project.barista101.model.Sections;
import com.project.barista101.repository.ContentRepository;
import com.project.barista101.repository.SectionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContentService {
    
    @Autowired
    private final ContentRepository contentRepository;
    @Autowired
    private final SectionRepository sectionRepository;

    @Transactional
    public List<Contents> getAllContentsForSection(UUID sectionId){
        Sections section = sectionRepository.findById(sectionId)
            .orElseThrow(() -> new IllegalStateException("Section with current id cannot be found"));

        return contentRepository.findAllBySection(section);
    }

    @Transactional
    public Contents getContent(UUID contentId){
        return contentRepository.findById(contentId)
            .orElseThrow(() -> new IllegalStateException("Content with current id cannot be found"));
    }

    @Transactional
    public Contents addContent(){

        Contents content = new Contents();

        return content;
    }
}
