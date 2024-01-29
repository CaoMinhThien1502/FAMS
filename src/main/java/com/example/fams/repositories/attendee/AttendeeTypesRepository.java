package com.example.fams.repositories.attendee;

import com.example.fams.models.attendee.AttendeeTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendeeTypesRepository extends JpaRepository<AttendeeTypes,Long> {
    @Query("SELECT a.attendeeType FROM AttendeeTypes a")
    List<String> getAttendeeType();
    AttendeeTypes findAttendeeTypesByAttendeeType(String type);
}
