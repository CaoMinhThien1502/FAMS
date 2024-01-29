package com.example.fams.service.impl.Training;

import com.example.fams.dto.Syllabus.syllabusCreation.TrainingContentDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDTO;
import com.example.fams.mapper.Syllabus.TrainingContentMapper;
import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.TrainingUnit;
import com.example.fams.repositories.training.TrainingContentRepository;
import com.example.fams.repositories.training.TrainingUnitRepository;
import com.example.fams.service.itf.TrainingContentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

//import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrainingContentServiceImpl implements TrainingContentService {

    private TrainingContentRepository trainingContentRepository;
    private TrainingUnit trainingUnit;
    private TrainingUnitRepository trainingUnitRepository;
    private TrainingContentMapper trainingContentMapper;

    // Content Operations //
    @Transactional
    public void addContent(TrainingUnitDTO trainingUnitDTO, Integer generatedUnitCode){
        List<TrainingContent> trainingContentList = new ArrayList<>();
        for(TrainingContentDTO each : trainingUnitDTO.getTrainingContentDTOList()){

            if (each.getDuration() < 0 || each.getDuration() > 480) throw new IllegalStateException("Missing value !!! Please check again !!!");
            if (each.getTrainingFormat().toLowerCase() != "online" && each.getTrainingFormat().toLowerCase() != "offline") throw new IllegalStateException("Missing value !!! Please check again !!!");
            if(!(each.getContent() != null && each.getContent().length() > 0) ||
                    (each.getDuration() < 0 || each.getDuration() > 480) ||
                    (each.getTrainingFormat().toLowerCase() != "online" && each.getTrainingFormat().toLowerCase() != "offline") ||
                    !(each.getDeliveryType() != null && each.getDeliveryType().length() > 0)){
                throw new IllegalStateException("Missing value !!! Please check again !!!");
            }

            TrainingContent trainingContent = new TrainingContent();
            trainingContentMapper.updateTrainingContentFromDTO(each, trainingContent);
            trainingContent.setUnitCode(trainingUnitRepository.findById("U" + generatedUnitCode).get());
            trainingContentList.add(trainingContent);
        }
        trainingContentRepository.saveAll(trainingContentList);
    }

    @Override
    public TrainingContent getTrainingContentByUnitCode(String code) {
       return trainingContentRepository.getTrainingContentByUnitCode(code);
    }

//    @Transactional
//    public void editContent(TrainingContent newTrainingContent){
//
//        TrainingContent currentTrainingContent = trainingContentRepository.findById(newTrainingContent.getId())
//                .orElseThrow(() -> new IllegalStateException("Doesn't exist !"));
//
//        trainingContentRepository.delete(currentTrainingContent);
//
//        trainingContentRepository.save(newTrainingContent);
//    }

//    @Transactional
//    public void deleteContent(Long id){
//        TrainingContent currentTrainingContent = trainingContentRepository.findById(id)
//                .orElseThrow(() -> new IllegalStateException("Doesn't exist !"));
//
//        trainingContentRepository.delete(currentTrainingContent);
//    }
}
