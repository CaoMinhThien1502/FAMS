package com.example.fams.service.itf;

import com.example.fams.models.syllabus.LearningObjective;

public interface LearningObjectiveService {
    public  String genObjectiveCode();

    void saveLearningObjective(LearningObjective data);


}
