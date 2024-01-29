package com.example.fams.controller;

import com.example.fams.dto.dashboard.DashboardDTO;
import com.example.fams.service.itf.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/user")
    public String getAllUsers() {
        return "user/userManagement";
    }
    @GetMapping("/userPermission")
    public String userPermission() {
        return "user/userPermission";
    }
    @GetMapping("/updatePermission")
    public String updatePermission() {
        return "user/updatePermission";
    }
    @GetMapping("/unigate")
    public String moveUniGate() {
        return "redirect:https://unigate.fsoft.com.vn/";
    }
    @GetMapping("/viewClass")
    public String ViewClass() {
        return "view-class";
    }
    @GetMapping("/createClass")
    public String CreateClass() {
        return "create-class/create-class-name";
    }
    @GetMapping("/viewMaterials")
    public String ViewMaterials() {
        return "view-learning-materials";
    }

}
