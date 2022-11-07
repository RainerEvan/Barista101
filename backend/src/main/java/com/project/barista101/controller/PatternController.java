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

import com.project.barista101.model.latteart.Patterns;
import com.project.barista101.payload.request.PatternRequest;
import com.project.barista101.service.PatternService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/pattern")
@AllArgsConstructor
public class PatternController {
    @Autowired
    private final PatternService patternService;

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addPattern(@RequestBody PatternRequest patternRequest){
        try{
            Patterns pattern = patternService.addPattern(patternRequest);

            return ResponseHandler.generateResponse("Pattern has been added successfully!", HttpStatus.OK, pattern);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deletePattern(@RequestParam("patternId") UUID patternId){
        try{
            patternService.deletePattern(patternId);

            return ResponseHandler.generateResponse("Pattern has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
