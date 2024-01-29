package com.example.fams.mapper.Syllabus;

import com.example.fams.dto.Syllabus.syllabusCreation.TrainingContentDTO;
import com.example.fams.models.training.TrainingContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TrainingContentMapper {
    TrainingContentDTO trainingContentToTrainingContentDTO(TrainingContent trainingContent);

    TrainingContent trainingContentDTOToTrainingContent(TrainingContentDTO trainingContentDTO);


    @Mapping(target = "unitCode", ignore = true)
    @Mapping(target = "note", ignore = true)
    void updateTrainingContentFromDTO(TrainingContentDTO trainingContentDTO, @MappingTarget TrainingContent trainingContent);

    void updateDTOFromTrainingContent(TrainingContent trainingContent, @MappingTarget TrainingContentDTO trainingContentDTO);
}
