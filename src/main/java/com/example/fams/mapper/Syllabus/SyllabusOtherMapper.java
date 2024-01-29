package com.example.fams.mapper.Syllabus;

import com.example.fams.dto.Syllabus.syllabusCreation.SyllabusOtherDTO;
import com.example.fams.models.syllabus.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SyllabusOtherMapper {
    Syllabus SyllabusOtherDTOToSyllabus(SyllabusOtherDTO syllabusOtherDTO);
    SyllabusOtherDTO SyllabusToSyllabusOtherDTO(Syllabus syllabus);

    @Mapping(target = "topicCode", ignore = true)
    @Mapping(target = "topicName", ignore = true)
    @Mapping(target = "trainingMaterials", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "trainingAudience", ignore = true)
    @Mapping(target = "priority", ignore = true)
    @Mapping(target = "topicOutline", ignore = true)
    @Mapping(target = "publicStatus", ignore = true)
    @Mapping(target = "createBy", ignore = true)
    @Mapping(target = "createDate", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assessmentScheme", ignore = true)
    void updateSyllabusFromDTO(SyllabusOtherDTO syllabusOtherDTO,
                               @MappingTarget Syllabus syllabus);
    void updateDTOFromSyllabus(Syllabus syllabus,
                               @MappingTarget SyllabusOtherDTO syllabusOtherDTO);
}