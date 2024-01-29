package com.example.fams.dto.clazz;

import com.example.fams.dto.attendee.AttendeeDTO;
import com.example.fams.models.attendee.Attendee;
import com.example.fams.models.training.TrainingProgram;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
@Component
public class ClassSubjectDTO {
    private String className;
  //  @Pattern(regexp = "^[A-Z]{3}"+"-"+"[0-9]{2}"+"-"+"[0-9]{2}$", message = "Location Code-Current Year(yy)-Incremental Number (01-99)")
    private String classCode;
    private Integer duration;
    private String status;
    private String location;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeFrom;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeTo;
    private String classTime;
    private String fsu;
    @DateTimeFormat(pattern = "MM-dd-yyyy")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "MM-dd-yyyy")
    private LocalDate endDate;
    private String createBy;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate createDate;
    private TrainingProgram trainingProgram;
    private Attendee attendee;
    private String dateLearning;

    public String getDateLearning() {
        return dateLearning;
    }

    public void setDateLearning(String dateLearning) {
        this.dateLearning = dateLearning;
    }

    public LocalTime getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(LocalTime timeFrom) {
        this.timeFrom = timeFrom;
    }

    public LocalTime getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(LocalTime timeTo) {
        this.timeTo = timeTo;
    }

    public Attendee getAttendee() {
        return attendee;
    }

    public void setAttendee(Attendee attendee) {
        this.attendee = attendee;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getClassTime() {
        return classTime;
    }

    public void setClassTime(String classTime) {
        this.classTime = classTime;
    }

    public String getFsu() {
        return fsu;
    }

    public void setFsu(String fsu) {
        this.fsu = fsu;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public TrainingProgram getTrainingProgram() {
        return trainingProgram;
    }

    public void setTrainingProgram(TrainingProgram trainingProgram) {
        this.trainingProgram = trainingProgram;
    }
}
