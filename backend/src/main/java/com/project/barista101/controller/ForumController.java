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

import com.project.barista101.model.forum.Forums;
import com.project.barista101.payload.request.ForumRequest;
import com.project.barista101.service.ForumService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/forum")
@AllArgsConstructor
public class ForumController {
    
    @Autowired
    private final ForumService forumService;
    
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addForum(@RequestBody ForumRequest forumRequest){
        try{
            Forums forum = forumService.addForum(forumRequest);

            return ResponseHandler.generateResponse("Forum has been added successfully!", HttpStatus.OK, forum);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteForum(@RequestParam("forumId") UUID forumId){
        try{
            forumService.deleteForum(forumId);

            return ResponseHandler.generateResponse("Forum has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
