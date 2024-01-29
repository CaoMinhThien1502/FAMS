package com.example.fams.service.itf;

import com.example.fams.models.attendee.AttendeeTypes;

import java.util.List;

public interface AttendeeTypesService {
    List<String> getAttendeeType();
    AttendeeTypes findAttendeeTypesByAttendeeType(String type);
}
