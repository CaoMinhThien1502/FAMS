package com.example.fams.config;

import com.example.fams.models.user.User;
import com.example.fams.models.user.UserPermission;
import com.example.fams.repositories.user.UserPermissionRepository;
import com.example.fams.repositories.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Optional;

@Component
public class SQLRunner implements CommandLineRunner {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    private final JdbcTemplate jdbcTemplate;

    public SQLRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        String sqlScript = loadSQLScript();
        jdbcTemplate.execute(sqlScript);

        String pass = passwordEncoder.encode("fams12345");
        Optional<User> optionalUser = userRepository.findByEmail("fptfams@gmail.com");
        UserPermission userPermission;
        if (optionalUser.isEmpty()) {
            userPermission = userPermissionRepository.findByRole("SUPER_ADMIN");
            if (userPermission != null) {
                User user = new User();
                user.setPhone("0818652981");
                user.setName("Super Admin Test");
                user.setEmail("fptfams@gmail.com");
                user.setDob(LocalDate.parse("2002-07-07"));
                user.setPassword(pass);
                user.setGender("male");
                user.setCreateDate(LocalDate.now());
                user.setCreateBy(user.getName());
                user.setStatus(true);
                user.setRole(userPermission); // Gán UserPermission cho User
                userRepository.save(user);
            }
        }
        optionalUser = userRepository.findByEmail("adfams100@gmail.com");
        if (optionalUser.isEmpty()) {
            userPermission = userPermissionRepository.findByRole("ADMIN");
            if (userPermission != null) {
                User user = new User();
                user.setPhone("0352900926");
                user.setName("Admin Test");
                user.setEmail("adfams100@gmail.com");
                user.setDob(LocalDate.parse("2002-07-08"));
                user.setPassword(pass);
                user.setGender("male");
                user.setCreateDate(LocalDate.now());
                user.setCreateBy(user.getName());
                user.setStatus(true);
                user.setRole(userPermission); // Gán UserPermission cho User
                userRepository.save(user);
            }
        }
        optionalUser = userRepository.findByEmail("famstrainer@gmail.com");
        if (optionalUser.isEmpty()) {
            userPermission = userPermissionRepository.findByRole("TRAINER");
            if (userPermission != null) {
                User user = new User();
                user.setPhone("0914553441");
                user.setName("Trainer Test");
                user.setEmail("famstrainer@gmail.com");
                user.setDob(LocalDate.parse("2002-07-09"));
                user.setPassword(pass);
                user.setGender("male");
                user.setCreateDate(LocalDate.now());
                user.setCreateBy(user.getName());
                user.setStatus(true);
                user.setRole(userPermission); // Gán UserPermission cho User
                userRepository.save(user);
            }
        }
    }

    private String loadSQLScript() throws IOException {
        ClassPathResource resource = new ClassPathResource("data50-new.sql");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
}