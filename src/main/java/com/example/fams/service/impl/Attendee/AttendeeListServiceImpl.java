package com.example.fams.service.impl.Attendee;

import com.example.fams.dto.attendee.AttendeeListDTO;
import com.example.fams.mapper.AttendeeListMapper;
import com.example.fams.models.attendee.Attendee;
import com.example.fams.models.user.User;
import com.example.fams.repositories.attendee.AttendeeListRepository;
import com.example.fams.repositories.user.UserRepository;
import com.example.fams.service.itf.AttendeeListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendeeListServiceImpl implements AttendeeListService {

    @Autowired
    private AttendeeListMapper mapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AttendeeListRepository repository;
    @Override
    public void AddAttendeeToClass(Attendee attendee, String student) {
        AttendeeListDTO attendeeListDTO = new AttendeeListDTO();
        attendeeListDTO.setAttendee(attendee);
        if(student!= null){
            String[] list = student.split(",");
            for(String x: list){
                List<User> list1 = userRepository.findUserByName(x);
                for (User y:list1){
                    attendeeListDTO.setUser(y);
                    repository.save(mapper.attendeeListDtoToAttendeeList(attendeeListDTO));
                }
            }
        }
    }
}
