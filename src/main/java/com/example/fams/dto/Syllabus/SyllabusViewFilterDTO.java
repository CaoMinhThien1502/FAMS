package com.example.fams.dto.Syllabus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SyllabusViewFilterDTO {
    ArrayList<String> searchBy;
    ArrayList<String> searchDate;
    Integer currentPage;
    String sortColumn;


}
