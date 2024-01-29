package com.example.fams.service.itf;


import com.example.fams.dto.Syllabus.SyllabusSearchDTO;


import com.example.fams.dto.Syllabus.SyllabusViewFilterDTO;
import com.example.fams.dto.trainingprogram.SyllabusDetailDTO;
import com.example.fams.models.syllabus.Syllabus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SyllabusService {




    List<String> importSyllabusFromFile(MultipartFile multipartFile,
                                        String encoding,
                                        String separator,
                                        boolean[] ScanOptionCheckBox,
                                        String radio,
                                        HttpServletRequest request);

    Long testQuery(Long ids);

    List<SyllabusSearchDTO> searchSyllabus(String keyword);

    List<Syllabus> getAllSyllabusByTrainingProgramName(String programName);


    public List<Object> getSyllabusList(SyllabusViewFilterDTO viewDetailDTO);

    List<Syllabus> listAllSyllabus();

    SyllabusDetailDTO getSyllabusByCode(String code);


    void removeObjective(Long syllabusId, String objectiveCode);

    String deleteSyllabus(Long syllabusId);

    String toggleSyllabusStatus(long syllabusId);

    Long getSyllabusByCodeAndVersion(String topicCode, String version);

    List<String> getVersionList(Long syllabusId);


    String getNewTopicCode(String baseCode);
}
