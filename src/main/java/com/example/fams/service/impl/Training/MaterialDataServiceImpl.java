package com.example.fams.service.impl.Training;

import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.material.MaterialData;
import com.example.fams.repositories.training.TrainingContentRepository;
import com.example.fams.repositories.training.material.MaterialDataRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.MaterialDataService;
import com.example.fams.utils.MaterialUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MaterialDataServiceImpl implements MaterialDataService {

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    private MaterialDataRepository repository;


    @Autowired
    private TrainingContentRepository tcrepo;
    @Value("${file.path}")
    private String filePath;

    @Override
    public List<MaterialData> getAll() {
        return repository.findAll();
    }

    @Override
    public String uploadMaterial(MultipartFile material, String code, HttpServletRequest request) throws IOException {
        TrainingContent tc = tcrepo.findTrainingContentByContent(code);
        if (tc==null){
            if (tcrepo.existsById(Long.parseLong(code))){
                tc = tcrepo.findById(Long.parseLong(code)).get();
            }else{
                return "Can not find topic code";
            }
        }

        String dir = System.getProperty("user.dir") + "/" + filePath;
        MaterialData materialData = repository.save(MaterialData.builder()
                .trainingContent(tc)
                .name(material.getOriginalFilename())
                .createDate(LocalDate.now())
                .createBy(tokenProvider.getUserNameFromJWT(request))
                .materialData(MaterialUtils.compressMaterial(material.getBytes()))
                .build());
        if (materialData != null) {
            try {
                material.transferTo(new File(dir + "/" + material.getOriginalFilename()));
            } catch (Exception e) {
            }
            return "Upload file successfully " + material.getOriginalFilename();
        } else {
            return "Upload file failed!!!";
        }

    }

    @Override
    public Optional<MaterialData> findByName(String filename) {
        Optional<MaterialData> dbMaterialDate = repository.findByName(filename);
        return dbMaterialDate;
    }

    @Override
    public void deleteMaterial(MaterialData filename) {
        repository.delete(filename);
        try {
            String dir = System.getProperty("user.dir") + "/" + filePath + "/" + filename.getName();
            Path path = Paths.get(dir);
            Files.deleteIfExists(path);
        } catch (Exception e) {

        }

    }

    @Override
    public Resource getFile(String fileName) throws IOException {
        String dir = System.getProperty("user.dir") + "/" + filePath + "/" + fileName;
        Path path = Paths.get(dir);
        try {
            return new UrlResource(path.toUri());
        } catch (Exception e) {
        }
        return null;
    }

    @Override
    public List<MaterialData> realTime(String name) {
        String name_lower = name.toLowerCase();
        return repository.findMaterialDataByName(name_lower);
    }

    @Override
    public List<MaterialData> findMaterialDataByTrainingContent(String content) {
        return repository.findMaterialDataByTrainingContent(content);
    }

    @Override
    public MaterialData checkDuplicate(String name) {
        return repository.checkDuplicate(name);
    }

    @Override
    public List<MaterialData> findMaterialDataByContent(Long content) {

        return repository.findMaterialDataByContent(content);
    }
}
