package com.example.fams.service.impl.Attendee;

import com.example.fams.mapper.AttendeeMapper;
import com.example.fams.models.attendee.Attendee;
import com.example.fams.repositories.attendee.AttendeeRepository;
import com.example.fams.service.itf.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendeeServiceImpl implements AttendeeService {

    @Autowired
    private AttendeeRepository attendeeRepository;
    @Autowired
    private AttendeeMapper mapper;
    @Override
    public void CreateAttendee(Attendee attendee) {
            attendeeRepository.save(attendee);
    }
}
