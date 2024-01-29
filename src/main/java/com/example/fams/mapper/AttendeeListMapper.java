package com.example.fams.mapper;

import com.example.fams.dto.attendee.AttendeeListDTO;
import com.example.fams.dto.clazz.ClassUserDTO;
import com.example.fams.models.attendee.AttendeeList;
import com.example.fams.models.clazz.ClassUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttendeeListMapper {

    @Mapping(target = "alId",ignore = true)
    AttendeeList attendeeListDtoToAttendeeList(AttendeeListDTO attendeeListDTO);
}
