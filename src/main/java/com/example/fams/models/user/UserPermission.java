package com.example.fams.models.user;

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
@Table(name = "tbl_user_permission")
public class UserPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long permissionId;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String role;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String syllabus;
    @Column(columnDefinition = "varchar(50)")
    private String trainingProgram;
    @Column(name = "class")
    private String clazz;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String learningMaterial;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String userManagement;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private Set<User> users;



}
