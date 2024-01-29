package com.example.fams.service.impl.Training;

import com.example.fams.dto.Syllabus.syllabusCreation.GeneralInfoFormDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingContentDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDayNumberDTO;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingUnit;
import com.example.fams.repositories.training.TrainingUnitRepository;
import com.example.fams.service.itf.TrainingUnitService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TrainingUnitServiceImpl implements TrainingUnitService {

    @Autowired
    private TrainingUnitRepository trainingUnitRepository;


//    @Transactional
//    public void createNewDay(){
//
//    }

    // Unit Operations //
    // How to generate unitCode automatically ?
//    @Transactional
//    public void addNewUnit(String unitName, Integer dayNumber){
//        TrainingUnit trainingUnit = new TrainingUnit();
//        String unitCode = "U" + (trainingUnitRepository.numberOfUnits() + 1);
//        trainingUnit.setUnitCode(unitCode);
//        trainingUnit.setUnitName(unitName);
//        trainingUnit.setDayNumber(dayNumber);
//        trainingUnitRepository.save(trainingUnit);
//        System.out.println(trainingUnit);
//    }

    @Transactional
    public void validateNull(List<TrainingUnitDTO> trainingUnitDTOList){
        for(TrainingUnitDTO eachUnit : trainingUnitDTOList){
            if(eachUnit.getUnitName().isEmpty() || eachUnit.getUnitName().length() == 0) throw new IllegalStateException("EM17");
            for(TrainingContentDTO eachContent : eachUnit.getTrainingContentDTOList()){
                if(eachContent.getContent().isEmpty() || eachContent.getContent().length() == 0) throw new IllegalStateException("EM18");
                if(eachContent.getLearningObjective()==null) throw new IllegalStateException("EM19");
                if(eachContent.getDuration() == null) throw new IllegalStateException("EM20");
                if(eachContent.getDeliveryType().isEmpty() || eachContent.getDeliveryType().length() == 0) throw new IllegalStateException("EM21");
            }
        }
    }

    @Transactional
    public void validateSaveDraft(List<TrainingUnitDayNumberDTO> trainingUnitDayNumberDTOList) {
        if (trainingUnitDayNumberDTOList.isEmpty()) throw new IllegalStateException("EM23");
        for (TrainingUnitDayNumberDTO eachDayNumber : trainingUnitDayNumberDTOList) {
            if (eachDayNumber.getTrainingUnitDTOList().isEmpty()) throw new IllegalStateException("EM24");
            for (TrainingUnitDTO eachUnit : eachDayNumber.getTrainingUnitDTOList()) {
                if (eachUnit.getTrainingContentDTOList().isEmpty()) throw new IllegalStateException("EM25");
                Integer temp = 0;
                for (TrainingContentDTO eachContent : eachUnit.getTrainingContentDTOList()) {
                    temp += eachContent.getDuration();
                }
                if (temp > (8 * 60)) throw new IllegalStateException("EM26");
            }
        }
    }


    @Transactional
    public void addNewUnit(List<TrainingUnitDayNumberDTO> trainingUnitDayNumberDTOList,
                          Syllabus syllabus){
        for(TrainingUnitDayNumberDTO eachDayNumber : trainingUnitDayNumberDTOList){
            for(TrainingUnitDTO eachUnit : eachDayNumber.getTrainingUnitDTOList()){
                TrainingUnit trainingUnit = new TrainingUnit();

                trainingUnit.setUnitCode(eachUnit.getUnitCode());
                trainingUnit.setUnitName(eachUnit.getUnitName());
                trainingUnit.setDayNumber(eachDayNumber.getDayNumber());
                trainingUnit.setSyllabusId(syllabus);
                trainingUnitRepository.save(trainingUnit);
            }
        }
    }

    @Transactional
    public Integer generateUnitCode(GeneralInfoFormDTO generalInfoFormDTO) {
        return (trainingUnitRepository.numberOfUnits(
                generalInfoFormDTO
                        .getTopicCode()) + 1);
    }



    @Override
    public List<TrainingUnit> getTrainingUnitByTopicCode(String code) {
        return trainingUnitRepository.getTrainingUnitByTopicCode(code);
    }

    @Override
    @Transactional
    public void deleteTrainingUnits(String codeList) {
        String processCodeList = codeList.replaceAll("\\[|\\]", "");
        List<String> idList = List.of(processCodeList.split(","));
        System.out.println(idList);
        trainingUnitRepository.deleteAllById(idList);
    }


}
