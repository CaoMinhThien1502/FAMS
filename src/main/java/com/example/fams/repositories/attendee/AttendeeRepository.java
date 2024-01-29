package com.example.fams.repositories.attendee;

import com.example.fams.models.attendee.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AttendeeRepository extends JpaRepository<Attendee,Long> {
}
