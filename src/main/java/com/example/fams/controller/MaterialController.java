package com.example.fams.controller;

import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.material.MaterialData;
import com.example.fams.service.itf.MaterialDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/material")
public class MaterialController {

    @Autowired
    private MaterialDataService service;


    private final ObjectMapper jsonMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @GetMapping
    String getAllMaterial(Model model){
        model.addAttribute("materials",service.getAll());
        return "view-learning-materials";
    }
    @GetMapping("/getAll")
    @ResponseBody
    List<MaterialData> getAllMaterials(){
        return service.getAll();
    }
    @GetMapping("/check-duplicate")
    @ResponseBody
    MaterialData checkDuplicate(String name){
        return service.checkDuplicate(name);
    }
    @GetMapping("/real-time")
    @ResponseBody
    List<MaterialData> searchReal(@RequestParam String name){
        List<MaterialData> list = service.realTime(name);
        if (list != null) {
            return list;
        } else {
            return null;
        }
    }
    @GetMapping("/upload")
    String uploads(){
        return "create-class/test";
    }
    @GetMapping("/list-file")
    @ResponseBody
    List<MaterialData> listFile(String content){
       List<MaterialData> list =  service.findMaterialDataByTrainingContent(content);
       if(list != null){
           if(list.size() > 0){
               return list;
           }else {
               return null;
           }
       }else return null;
    }
    @PostMapping("/upload")
    @ResponseBody
    String uploadMaterial(@RequestParam("material")MultipartFile material,
                          @RequestParam("code") String learningCode,
                          @RequestParam(value = "tp") String tp,
                          @RequestParam(value = "day") String day,
                          @RequestParam(value = "tp_code") String code,
                          @RequestParam(value = "name") String name,
                          @RequestParam(value = "content") String content,
                          RedirectAttributes ra,
                          HttpServletRequest request) throws IOException{
        System.out.println(learningCode);
        service.uploadMaterial(material, learningCode, request);
        return  day+"_"+code+"_"+name+"_"+content+"_"+tp;
    }
    @GetMapping("/download")
    ResponseEntity<?> downloadMaterial(@RequestParam(value = "filename") String filename) throws IOException {
        Resource resource = service.getFile(filename);
        if(resource != null){
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/delete")
    String deleteMaterial(
            @RequestParam(value = "filename") String filename,
            @RequestParam(value = "tp") String tp,
            @RequestParam(value = "day") String day,
            @RequestParam(value = "code") String code,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "content") String content,
            RedirectAttributes ra){

        Optional<MaterialData> file = service.findByName(filename);
        if(file.isPresent()){
            service.deleteMaterial(file.get());
         }
        ra.addFlashAttribute("materials",day+"_"+code+"_"+name+"_"+content+"_"+tp);
        TrainingProgramController tpc = new TrainingProgramController();
        return  "redirect:/trainingprogram/detail?trainingProgramCode=" +tp;
    }


    @GetMapping("/delete/content")
    ResponseEntity<String> deleteMaterialInContent(
            @RequestParam(value = "filename") String filename){

        Optional<MaterialData> file = service.findByName(filename);
        if(file.isPresent()){
            service.deleteMaterial(file.get());
        }
        TrainingProgramController tpc = new TrainingProgramController();
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/content-materials")
    public ResponseEntity<List<MaterialData>> getContentMaterials(@RequestParam("id") Long contentId) throws JsonProcessingException {

        List<MaterialData> materialDataList = service.findMaterialDataByContent(contentId);
        return new ResponseEntity<>(materialDataList, HttpStatus.OK);
    }
}
