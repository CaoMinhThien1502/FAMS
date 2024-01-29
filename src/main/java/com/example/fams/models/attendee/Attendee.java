package com.example.fams.models.attendee;

import com.example.fams.models.clazz.ClassSubject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_attendee")
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aId;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private int planned;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private int accepted;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private int actual;

    @OneToOne(mappedBy = "attendee")
    @JsonIgnore
    private ClassSubject classSubject;

    @OneToMany(mappedBy = "attendee")
    @JsonIgnore
    private Set<AttendeeList> attendeeListSet;

    @ManyToOne
    @JoinColumn(name = "a_type_id")
    private AttendeeTypes attendeeType;

}
