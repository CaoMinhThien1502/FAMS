package com.example.fams.mapper.Syllabus;

import com.example.fams.dto.Syllabus.syllabusCreation.GeneralInfoFormDTO;
import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.models.syllabus.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GeneralInfoMapper {
    Syllabus SyllabusGeneralDTOToSyllabus(GeneralInfoFormDTO generalInfoFormDTO);
    GeneralInfoFormDTO  SyllabusToSyllabusGeneralDTO(Syllabus syllabus);
    LearningObjective  GeneralInfoFormDTOToLearningObjective(GeneralInfoFormDTO generalInfoFormDTO);
    GeneralInfoFormDTO LearningObjectiveToGeneralInfoFormDTO(LearningObjective learningObjective);


    //DTO and Syllabus
    @Mapping(target = "trainingMaterials", ignore = true)
    @Mapping(target = "topicOutline", ignore = true)
    @Mapping(target = "trainingPrinciplesTraining", ignore = true)
    @Mapping(target = "trainingPrinciplesRetest", ignore = true)
    @Mapping(target = "trainingPrinciplesMarking", ignore = true)
    @Mapping(target = "trainingPrinciplesCriteria", ignore = true)
    @Mapping(target = "trainingPrinciplesOthers", ignore = true)
    @Mapping(target = "publicStatus", ignore = true)
    @Mapping(target = "createBy", ignore = true)
    @Mapping(target = "createDate", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    void updateSyllabusFromDTO(GeneralInfoFormDTO generalInfoFormDTO,
                               @MappingTarget Syllabus syllabus);
    void updateDTOFromSyllabus(Syllabus syllabus,
                               @MappingTarget GeneralInfoFormDTO generalInfoFormDTO);


//    DTO and LearningObjective

    @Mapping(target = "syllabusObjective", ignore = true)
    void updateLearningObjectiveFromDTO(GeneralInfoFormDTO generalInfoFormDTO, @MappingTarget LearningObjective learningObjective);

    void updateDTOFromLearningObjective(LearningObjective learningObjective, @MappingTarget GeneralInfoFormDTO generalInfoFormDTO);
}
