package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.course.Contents;
import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.ContentRequest;
import com.project.barista101.repository.ContentRepository;
import com.project.barista101.repository.ModuleRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContentService {
    
    @Autowired
    private final ContentRepository contentRepository;
    @Autowired
    private final ModuleRepository moduleRepository;

    @Transactional
    public List<Contents> getAllContentsForModule(UUID moduleId){
        Modules module = moduleRepository.findById(moduleId)
            .orElseThrow(() -> new IllegalStateException("Module with current id cannot be found"));

        return contentRepository.findAllByModule(module);
    }

    @Transactional
    public Contents getContent(UUID contentId){
        return contentRepository.findById(contentId)
            .orElseThrow(() -> new IllegalStateException("Content with current id cannot be found"));
    }

    @Transactional
    public Contents addContent(ContentRequest contentRequest){
        Modules module = moduleRepository.findById(contentRequest.getModuleId())
            .orElseThrow(() -> new IllegalStateException("Module with current id cannot be found"));

        Contents content = new Contents();
        content.setModule(module);
        content.setTitle(contentRequest.getTitle());
        content.setBody(contentRequest.getBody());

        return contentRepository.save(content);
    }

    @Transactional
    public Contents editContent(UUID contentId, ContentRequest contentRequest){
        Contents content = getContent(contentId);

        if(contentRequest.getTitle() != null){
            content.setTitle(contentRequest.getTitle());
        }

        if(contentRequest.getBody() != null){
            content.setBody(contentRequest.getBody());
        }

        return contentRepository.save(content);
    }

    @Transactional
    public void deleteContent(UUID contentId){
        Contents content = contentRepository.findById(contentId)
            .orElseThrow(() -> new IllegalStateException("Content with current id cannot be found"));

        contentRepository.delete(content);
    }
}
