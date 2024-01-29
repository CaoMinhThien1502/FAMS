package com.example.fams.service.itf;

import com.example.fams.dto.Syllabus.syllabusCreation.SyllabusDetailsDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface SyllabusDetailsService {

    SyllabusDetailsDTO showSyllabusDetails(Long syllabusId, String actionType);

    public String saveSyllabusDetails(SyllabusDetailsDTO syllabusDetailsDTO,
                        HttpServletRequest request);


}
