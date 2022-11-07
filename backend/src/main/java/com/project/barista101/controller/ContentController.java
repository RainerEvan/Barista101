package com.project.barista101.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.model.course.Contents;
import com.project.barista101.payload.request.ContentRequest;
import com.project.barista101.service.ContentService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/content")
@AllArgsConstructor
public class ContentController {
    
    @Autowired
    private final ContentService contentService;

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addContent(@RequestBody ContentRequest contentRequest){
        try{
            Contents content = contentService.addContent(contentRequest);

            return ResponseHandler.generateResponse("Content has been added successfully!", HttpStatus.OK, content);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteContent(@RequestParam("contentId") UUID contentId){
        try{
            contentService.deleteContent(contentId);

            return ResponseHandler.generateResponse("Content has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
