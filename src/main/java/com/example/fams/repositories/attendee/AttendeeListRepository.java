package com.example.fams.repositories.attendee;

import com.example.fams.models.attendee.AttendeeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendeeListRepository extends JpaRepository<AttendeeList,Long> {
}
