package com.example.fams.dto.Syllabus.syllabusCreation;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SyllabusDetailsDTO {
    String publicStatus;

    String actionType;

    GeneralInfoFormDTO generalInfoFormDTODetails;

    List<TrainingUnitDTO> trainingUnitDTOListDetails;

    SyllabusOtherDTO syllabusOtherDTODetails;
    @JsonCreator
    public SyllabusDetailsDTO(
            @JsonProperty("publicStatus") String publicStatus,
            @JsonProperty("actionType") String actionType,
            @JsonProperty("generalInfoFormDTODetails") GeneralInfoFormDTO generalInfoFormDTODetails,
            @JsonProperty("trainingUnitDTOListDetails") List<TrainingUnitDTO> trainingUnitDTOListDetails,
            @JsonProperty("syllabusOtherDTODetails") SyllabusOtherDTO syllabusOtherDTODetails) {
        this.publicStatus = publicStatus;
        this.actionType = actionType;
        this.generalInfoFormDTODetails = generalInfoFormDTODetails;
        this.trainingUnitDTOListDetails = trainingUnitDTOListDetails;
        this.syllabusOtherDTODetails = syllabusOtherDTODetails;

    }
}


