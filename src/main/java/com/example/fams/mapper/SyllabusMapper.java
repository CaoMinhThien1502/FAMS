package com.example.fams.mapper;

import com.example.fams.dto.Syllabus.SyllabusDuplicateDTO;
import com.example.fams.dto.Syllabus.SyllabusSearchDTO;
import com.example.fams.models.syllabus.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")

public interface SyllabusMapper {
    SyllabusDuplicateDTO syllabusToSyllabusDTO(Syllabus syllabus);

    Syllabus syllabusDTOToSyllabus(SyllabusDuplicateDTO syllabusDuplicateDTO);
    @Mapping(target = "topicCode", ignore = true)
    @Mapping(target = "version", source = "newVersion")
    Syllabus duplicateSyllabus(Syllabus originalSyllabus, @MappingTarget Syllabus syllabus, String newVersion);

    @Mapping(target = "searchField", expression = "java(syllabus.getTopicCode() + \" - \" + syllabus.getTopicName())")
    SyllabusSearchDTO syllabusToSearchDTO(Syllabus syllabus);


    List<SyllabusSearchDTO> syllabusListToSearchDTOList(List<Syllabus> syllabusList);


}
