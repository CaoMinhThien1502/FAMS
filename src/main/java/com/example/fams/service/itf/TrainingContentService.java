package com.example.fams.service.itf;

import com.example.fams.dto.Syllabus.syllabusCreation.TrainingContentDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDTO;
import com.example.fams.models.training.TrainingContent;

import java.util.List;

public interface TrainingContentService {

    public void addContent(TrainingUnitDTO trainingUnitDTO, Integer generatedUnitCode);
    TrainingContent getTrainingContentByUnitCode(String code);
}