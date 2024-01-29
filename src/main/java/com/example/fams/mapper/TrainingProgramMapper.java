package com.example.fams.mapper;

import com.example.fams.dto.trainingprogram.TrainingProgramDTO;
import com.example.fams.models.training.TrainingProgram;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrainingProgramMapper {
    TrainingProgramDTO toTrainingProgramDto(TrainingProgram trainingProgram);

    TrainingProgram toTrainingProgram(TrainingProgramDTO trainingProgramDTO);

    List<TrainingProgramDTO> toTrainingProgramDtoList(List<TrainingProgram> trainingProgramList);

    @Mapping(target = "trainingProgramCode", ignore = true)
    TrainingProgram duplicateTrainingProgram(TrainingProgram originalTrainingProgram, @MappingTarget TrainingProgram newTrainingProgram);

    @Mapping(target = "trainingProgramCode", ignore = true)
    void updateTrainingProgramFromDto(TrainingProgramDTO trainingProgramDTO, @MappingTarget TrainingProgram trainingProgram);

}
