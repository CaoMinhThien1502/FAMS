package com.example.fams.dto.clazz;

import com.example.fams.models.user.User;
import lombok.Data;

@Data
public class ClassUserDTO2 {

    private Long idCU;
    private String userType;
    private Long classId;
    private User user;

}
