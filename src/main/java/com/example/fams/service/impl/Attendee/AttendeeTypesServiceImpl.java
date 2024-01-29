package com.example.fams.service.impl.Attendee;

import com.example.fams.models.attendee.AttendeeTypes;
import com.example.fams.repositories.attendee.AttendeeTypesRepository;
import com.example.fams.service.itf.AttendeeTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AttendeeTypesServiceImpl implements AttendeeTypesService {
    @Autowired
    private AttendeeTypesRepository repository;
    @Override
    public List<String> getAttendeeType() {
        return repository.getAttendeeType();
    }

    @Override
    public AttendeeTypes findAttendeeTypesByAttendeeType(String type) {
        return repository.findAttendeeTypesByAttendeeType(type);
    }
}
