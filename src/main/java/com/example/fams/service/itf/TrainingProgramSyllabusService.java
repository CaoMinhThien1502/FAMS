package com.example.fams.service.itf;

import com.example.fams.models.training.TrainingProgramSyllabus;

import java.util.List;

public interface TrainingProgramSyllabusService {
    void deleteTrainingPrgramSyllabusByTPCode(String code);

    void getNewSyllabus(String code, List<String> selectedTopicCodes);
}
