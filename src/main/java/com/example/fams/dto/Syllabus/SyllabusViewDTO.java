package com.example.fams.dto.Syllabus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SyllabusViewDTO {

    /*make sure to check this DTO usage in the syllabusRepository
     if you make any changes to this class*/

    Long syllabusId;
    String topicName;
    String topicCode;
    LocalDate createDate;
    String createBy;
    Long duration;
    String status;
    Set<String> outPutStandard;


    public SyllabusViewDTO(Long syllabusId, String topicName, String topicCode, LocalDate createDate, String createBy, Long duration, String status) {
        this.syllabusId = syllabusId;
        this.topicName = topicName;
        this.topicCode = topicCode;
        this.createDate = createDate;
        this.createBy = createBy;
        this.duration = duration;
        this.status = status;
    }
}