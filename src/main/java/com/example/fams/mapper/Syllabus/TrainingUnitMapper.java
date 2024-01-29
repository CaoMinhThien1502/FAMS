package com.example.fams.mapper.Syllabus;

import com.example.fams.dto.Syllabus.syllabusCreation.TrainingUnitDTO;
import com.example.fams.models.training.TrainingUnit;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TrainingUnitMapper {
    TrainingUnitDTO trainingUnitToTrainingUnitDTO(TrainingUnit trainingUnit);

    TrainingUnit trainingUnitDTOToTrainingUnit(TrainingUnitDTO trainingUnitDTO);


    void updateDTOFromTrainingUnit(TrainingUnit trainingUnit ,@MappingTarget TrainingUnitDTO trainingUnitDTO);

    void updateTrainingUnitFromDTO(TrainingUnitDTO trainingUnitDTO ,@MappingTarget TrainingUnit trainingUnit);
}
