package com.example.fams.service.itf;

import com.example.fams.dto.Syllabus.syllabusCreation.GeneralInfoFormDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDayNumberDTO;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingUnit;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

public interface TrainingUnitService {

    public void addNewUnit(List<TrainingUnitDayNumberDTO> trainingUnitDayNumberDTOList, Syllabus syllabus);

    public Integer generateUnitCode(GeneralInfoFormDTO generalInfoFormDTO);

//    List<String> getOutputStandardByTopicCode(String topicCode);

//    public List<Object> getSyllabusView(Pageable pageable, int currentPage);

    List<TrainingUnit> getTrainingUnitByTopicCode(String code);


    public void deleteTrainingUnits(String codeList);
}
