package com.example.fams.dto.Syllabus;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.stereotype.Component;

@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor


@Getter
@Setter
@Component
public class SyllabusSearchDTO {
    private String topicCode;
    private String topicName;
    private String searchField;
}
