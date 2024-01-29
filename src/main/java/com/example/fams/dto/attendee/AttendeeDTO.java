package com.example.fams.dto.attendee;

import com.example.fams.models.attendee.AttendeeTypes;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@RequiredArgsConstructor
@Component
public class AttendeeDTO {

    private int planned;
    private int accepted;
    private int actual;
    private AttendeeTypes attendeeType;
    public int getPlanned() {
        return planned;
    }

    public void setPlanned(int planned) {
        this.planned = planned;
    }

    public int getAccepted() {
        return accepted;
    }

    public void setAccepted(int accepted) {
        this.accepted = accepted;
    }

    public int getActual() {
        return actual;
    }

    public void setActual(int actual) {
        this.actual = actual;
    }

    public AttendeeTypes getAttendeeType() {
        return attendeeType;
    }

    public void setAttendeeType(AttendeeTypes attendeeType) {
        this.attendeeType = attendeeType;
    }
}
