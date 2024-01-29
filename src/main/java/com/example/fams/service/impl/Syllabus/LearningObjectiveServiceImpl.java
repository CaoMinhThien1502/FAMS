package com.example.fams.service.impl.Syllabus;

import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.repositories.syllabus.LearningObjectiveRepository;
import com.example.fams.service.itf.LearningObjectiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class LearningObjectiveServiceImpl implements LearningObjectiveService {
    private final LearningObjectiveRepository learningObjectiveRepository;

    @Override
    public String genObjectiveCode() {
        Random intGenerator = new Random();
        StringBuilder codeBuilder = new StringBuilder();
        String code;
        codeBuilder.append((char) ('A'+intGenerator.nextInt(26)));
        codeBuilder.append(intGenerator.nextInt(10));
        codeBuilder.append((char) ('A'+intGenerator.nextInt(26)));
        codeBuilder.append((char) ('A'+intGenerator.nextInt(26)));
        System.out.println(codeBuilder.toString());
        if (learningObjectiveRepository.existsById(codeBuilder.toString())){
            code = genObjectiveCode();
        }else {
            code = codeBuilder.toString();
            return code;
        }

        return code;
    }

    @Override
    public void saveLearningObjective(LearningObjective data) {
        learningObjectiveRepository.save(data);
    }


}
