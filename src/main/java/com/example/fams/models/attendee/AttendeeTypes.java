package com.example.fams.models.attendee;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_attendee_types")
public class AttendeeTypes {

    @Id
    private Long aTypeId;

    private String attendeeType;

    @OneToMany(mappedBy = "attendeeType")
    @JsonIgnore
    private Set<Attendee> attendee;

}
