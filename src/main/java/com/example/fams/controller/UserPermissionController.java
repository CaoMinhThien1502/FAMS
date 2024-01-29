package com.example.fams.controller;

import com.example.fams.dto.permission.PermissionDTO;
import com.example.fams.mapper.PermissionMapper;
import com.example.fams.service.itf.UserPermissionService;
import com.example.fams.utils.ValidatorUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("api/permissions")
@RequiredArgsConstructor
public class UserPermissionController {

    @Autowired
    UserPermissionService userPermissionService;
    @Autowired
    ValidatorUtil validatorUtil;
    @Autowired
    PermissionMapper permissionMapper;

    @GetMapping
    public List<PermissionDTO> getAll() {
        return userPermissionService.getAll();
    }

    @PatchMapping
    public ResponseEntity<List<PermissionDTO>> patchUpdateUserPermissions(@RequestBody List<PermissionDTO> userPermissionDTOList) {
        userPermissionService.patchUpdateUserPermission(userPermissionDTOList);
        return new ResponseEntity<>(userPermissionService.getAll(), HttpStatus.OK);
    }


    private ResponseEntity<Object> getResponse(Object o, HttpStatus status) {
        return new ResponseEntity<>(o, status);
    }

}
