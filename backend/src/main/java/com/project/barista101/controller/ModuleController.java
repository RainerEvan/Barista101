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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.barista101.model.course.Modules;
import com.project.barista101.payload.request.ModuleRequest;
import com.project.barista101.service.ModuleService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/module")
@AllArgsConstructor
public class ModuleController {
    
    @Autowired
    private final ModuleService moduleService;
    
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addModule(@RequestPart("image") MultipartFile image, @RequestBody ModuleRequest moduleRequest){
        try{
            Modules module = moduleService.addModule(image, moduleRequest);

            return ResponseHandler.generateResponse("Module has been added successfully!", HttpStatus.OK, module);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteModule(@RequestParam("moduleId") UUID moduleId){
        try{
            moduleService.deleteModule(moduleId);

            return ResponseHandler.generateResponse("Module has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
