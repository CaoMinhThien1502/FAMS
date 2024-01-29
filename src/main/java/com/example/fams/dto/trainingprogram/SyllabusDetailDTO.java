package com.example.fams.dto.trainingprogram;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class SyllabusDetailDTO {
    private String topicName;
    private String topicCode;
    private String status;
    private String version;
    private Long duration;
    private LocalDate modifiedDate;
    private String modifiedBy;

    public SyllabusDetailDTO(String topicName, String topicCode, String status, String version, Long duration, LocalDate modifiedDate, String modifiedBy) {
        this.topicName = topicName;
        this.topicCode = topicCode;
        this.status = status;
        this.version = version;
        this.duration = duration;
        this.modifiedDate = modifiedDate;
        this.modifiedBy = modifiedBy;
    }

    public SyllabusDetailDTO(String topicName, String status, String version, Long duration, LocalDate modifiedDate, String modifiedBy) {
        this.topicName = topicName;
        this.status = status;
        this.version = version;
        this.duration = duration;
        this.modifiedDate = modifiedDate;
        this.modifiedBy = modifiedBy;
    }
}
