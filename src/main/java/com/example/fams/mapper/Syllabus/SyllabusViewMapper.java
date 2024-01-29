package com.example.fams.mapper.Syllabus;

import com.example.fams.dto.Syllabus.SyllabusViewDTO;
import com.example.fams.models.syllabus.Syllabus;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SyllabusViewMapper {
    Syllabus SyllabusViewDetailsDTOToSyllabus(SyllabusViewDTO syllabusViewDTO);
    SyllabusViewDTO SyllabusToSyllabusViewDetailsDTO(Syllabus syllabus);


    void updateDTOFromSyllabus(Syllabus syllabus,
                               @MappingTarget SyllabusViewDTO syllabusViewDTO);
}
