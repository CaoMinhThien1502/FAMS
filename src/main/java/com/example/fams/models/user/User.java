package com.example.fams.models.user;

import com.example.fams.models.attendee.AttendeeList;
import com.example.fams.models.training.TrainingProgram;
import jakarta.persistence.*;

import com.example.fams.models.clazz.ClassUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tbl_user")
public class User implements Serializable, UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Digits(integer = 20, fraction = 0, message = "ID must have at most 20 digits")
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, columnDefinition = "varchar(50)")
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Column(unique = true, nullable = false, columnDefinition = "varchar(120)")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Column(nullable = false)
    private String password;

    @Pattern(regexp = "0[0-9]{9}", message = "The phone number must consist of 10 numbers and start with 0")
    @NotBlank(message = "Phone cannot be blank")
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String phone;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false, columnDefinition = "varchar(50)")
    @NotNull(message = "Date of birth cannot be blank")
    private LocalDate dob;

    @Column(nullable = false, columnDefinition = "varchar(10)")
    @NotBlank(message = "Gender cannot be blank")
    private String gender;

    @NotNull(message = "Invalid status format (True - False)")
    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false, columnDefinition = "varchar(100)")
    private String createBy;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false, columnDefinition = "varchar(150)")
    private LocalDate createDate;

    @Column(columnDefinition = "varchar(100)")
    private String modifiedBy;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(columnDefinition = "varchar(150)")
    private LocalDate modifiedDate;

    @ManyToOne
    @JoinColumn(name = "role")
    private UserPermission role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<ClassUser> classUsers;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<AttendeeList> attendeeLists;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<TrainingProgram> trainingPrograms;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.getRole().getRole().toUpperCase()));
        authorities.add(new SimpleGrantedAuthority("CLASS_" + this.getRole().getClazz().toUpperCase()));
        authorities.add(new SimpleGrantedAuthority("TRAINING_PROGRAM_" + this.getRole().getTrainingProgram().toUpperCase()));
        authorities.add(new SimpleGrantedAuthority("SYLLABUS_" + this.getRole().getSyllabus().toUpperCase()));
        authorities.add(new SimpleGrantedAuthority("USER_MANAGEMENT_" + this.getRole().getUserManagement().toUpperCase()));
        authorities.add(new SimpleGrantedAuthority("LEARNING_MATERIAL_" + this.getRole().getLearningMaterial().toUpperCase()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
