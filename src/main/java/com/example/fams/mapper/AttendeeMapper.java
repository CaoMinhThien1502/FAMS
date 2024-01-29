package com.example.fams.mapper;

import com.example.fams.dto.attendee.AttendeeDTO;
import com.example.fams.models.attendee.Attendee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttendeeMapper {
    AttendeeDTO attendeeToAttendeeDTO(Attendee attendee);
    Attendee attendeeDTOToAttendee(AttendeeDTO attendeeDTO);
}
