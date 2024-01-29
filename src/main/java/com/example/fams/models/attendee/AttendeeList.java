package com.example.fams.models.attendee;

import com.example.fams.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_attendee_list")
public class AttendeeList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "a_Id")
    private Attendee attendee;
}
