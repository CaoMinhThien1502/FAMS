package com.example.fams.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("dashboard/index");
        registry.addViewController("/").setViewName("dashboard/index");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/syllabus").setViewName("syllabus");
        registry.addViewController("/login/reset").setViewName("forgot-password");
    }
}
