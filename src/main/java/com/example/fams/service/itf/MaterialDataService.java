package com.example.fams.service.itf;

import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.material.MaterialData;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MaterialDataService {

    List<MaterialData> getAll();
    String uploadMaterial(MultipartFile material, String code, HttpServletRequest request) throws IOException;
    Optional<MaterialData> findByName(String filename);
    void deleteMaterial(MaterialData filename);
    Resource getFile(String fileName) throws IOException;
    List<MaterialData> realTime(String name);
    List<MaterialData> findMaterialDataByTrainingContent(String content);
    MaterialData checkDuplicate(String name);

    List<MaterialData> findMaterialDataByContent(Long content);
}
