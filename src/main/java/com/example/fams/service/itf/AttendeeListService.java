package com.example.fams.service.itf;

import com.example.fams.dto.attendee.AttendeeDTO;
import com.example.fams.models.attendee.Attendee;
import com.example.fams.models.attendee.AttendeeList;

public interface AttendeeListService {
    void AddAttendeeToClass(Attendee attendee, String student);
}
