package com.example.fams.service.impl.Training;

import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.training.TrainingProgramSyllabus;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingProgramRepository;
import com.example.fams.repositories.training.TrainingProgramSyllabusRepository;
import com.example.fams.service.itf.TrainingProgramSyllabusService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramSyllabusServiceImpl implements TrainingProgramSyllabusService {

    @Autowired
    TrainingProgramSyllabusRepository trainingProgramSyllabusRepository;
    @Autowired
    TrainingProgramRepository trainingProgramRepository;
    @Autowired
    SyllabusRepository syllabusRepository;


    @Override
    @Transactional
    public void deleteTrainingPrgramSyllabusByTPCode(String code) {
        trainingProgramSyllabusRepository.deleteTrainingProgramSyllabus(code);
    }

    @Override
    public void getNewSyllabus(String code, List<String> selectedTopicCodes) {
        TrainingProgram trainingProgram = trainingProgramRepository.findTrainingProgramByTrainingProgramCode(code);
        for (String t:selectedTopicCodes) {
            Syllabus syllabus = syllabusRepository.findSyllabusByTopicCode(t);
            TrainingProgramSyllabus trainingProgramSyllabus = new TrainingProgramSyllabus();
            trainingProgramSyllabus.setTrainingProgram(trainingProgram);
            trainingProgramSyllabus.setSyllabus(syllabus);
            trainingProgramSyllabusRepository.save(trainingProgramSyllabus);
        }
    }
}
