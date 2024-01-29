package com.example.fams.config;

import com.example.fams.models.user.Permission;
import com.example.fams.security.token.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    public static final String[] ENDPOINTS_WHITELIST = {
            "/login",
            "/logout",
            "login/reset",
            "/access-denied"

    };
    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    public static final String LOGIN_FAIL_URL = LOGIN_URL + "?error";


    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    private String allowedOrigins = "http://localhost:[*],https://group2.fams.io.vn,http://group2.fams.io.vn";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        CorsConfiguration configuration = getCorsConfiguration();
        http.cors(corsCustomizer -> corsCustomizer.configurationSource(request -> configuration));

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers(ENDPOINTS_WHITELIST).permitAll() // cho phép truy cập các URL được xác định bởi danh sách ENDPOINTS_WHITELIST mà không cần xác thực
                        .requestMatchers(
                                "/api/v1/auth/**",
                                //"/api/**",
                                "/img/**",
                                "/css/**",
                                "/component/**",
                                "/js/**",
                                "/public/**",
                                "/create-class/**",
                                "/permissions/**",
                                "/assets/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "TRAINER")
                        .requestMatchers(HttpMethod.POST, "/api/user/create", "/api/user/changeStatus/**", "/api/user/import", "/api/user/checkemail/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/user/create", "/api/user/changeStatus/**", "/api/user/import", "/api/user/checkemail/**").hasAnyAuthority(Permission.USER_MANAGEMENT_FULL_ACCESS.name())
                        .requestMatchers(HttpMethod.PUT, "/api/user/update/**", "/api/user/changeRole/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/user/update/**", "/api/user/changeRole/**").hasAnyAuthority(Permission.USER_MANAGEMENT_FULL_ACCESS.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/permissions").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/permissions").hasAuthority(Permission.USER_MANAGEMENT_FULL_ACCESS.name())
//                       ------Class---------
                        .requestMatchers(HttpMethod.GET, "/class", "/class/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "TRAINER")
                        .requestMatchers(HttpMethod.POST, "/class/**").hasAnyAuthority(Permission.CLASS_FULL_ACCESS.name(), Permission.CLASS_MODIFY.name(), Permission.CLASS_CREATE.name())
                        .requestMatchers(HttpMethod.GET, "/class/**").hasAnyAuthority(Permission.CLASS_FULL_ACCESS.name(), Permission.CLASS_MODIFY.name(), Permission.CLASS_CREATE.name())
                        .requestMatchers(HttpMethod.GET, "/createClass").hasAnyAuthority(Permission.CLASS_FULL_ACCESS.name(), Permission.CLASS_CREATE.name())
//                       ---trainingProgram----
                        .requestMatchers(HttpMethod.POST, "/trainingprogram/**").hasAnyAuthority(Permission.TRAINING_PROGRAM_FULL_ACCESS.name(), Permission.TRAINING_PROGRAM_CREATE.name(), Permission.TRAINING_PROGRAM_MODIFY.name())
                        .requestMatchers(HttpMethod.GET, "/trainingprogram/create", "/trainingprogram/create-training-program").hasAnyAuthority(Permission.TRAINING_PROGRAM_FULL_ACCESS.name(), Permission.TRAINING_PROGRAM_CREATE.name())
                        .requestMatchers(HttpMethod.GET, "/trainingprogram/create", "/trainingprogram/create-training-program").hasAnyRole("SUPER_ADMIN", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/trainingprogram/update").hasAnyAuthority(Permission.TRAINING_PROGRAM_FULL_ACCESS.name(), Permission.TRAINING_PROGRAM_CREATE.name(), Permission.TRAINING_PROGRAM_MODIFY.name())
//                       -------syllabus-------
                        .requestMatchers(HttpMethod.GET, "/syllabus/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "TRAINER")
                        .requestMatchers(HttpMethod.POST, "/syllabus/details", "/syllabus/View").hasAnyRole("SUPER_ADMIN", "ADMIN", "TRAINER")
                        .requestMatchers(HttpMethod.PUT, "/syllabus/details/edit").hasAnyRole("SUPER_ADMIN", "ADMIN", "TRAINER")
                        .requestMatchers(HttpMethod.DELETE, "/syllabus/details/edit", "/syllabus/View").hasAnyRole("SUPER_ADMIN", "ADMIN" , "TRAINER")


                        .requestMatchers(HttpMethod.POST, "/syllabus/details/duplicate/**", "/syllabus/import", "/syllabus/details/save").hasAnyAuthority(Permission.SYLLABUS_FULL_ACCESS.name(), Permission.SYLLABUS_CREATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/syllabus/details/edit", "/syllabus/View").hasAnyAuthority(Permission.SYLLABUS_FULL_ACCESS.name(), Permission.SYLLABUS_MODIFY.name())


                        .anyRequest().authenticated())
                .formLogin(form -> form // Cấu hình xác thực dựa trên biểu mẫu (form-based authentication)
                                .loginPage(LOGIN_URL) // Xác định trang đăng nhập của ứng dụng
                        //.loginProcessingUrl(LOGIN_PROCESSING_URL) // URL để xử lý quá trình đăng nhập
                        //.failureUrl(LOGIN_FAIL_URL) // URL để chuyển hướng sau khi đăng nhập thất bại
                        //.usernameParameter(EMAIL) //  Xác định tên của các trường USERNAME trong biểu mẫu HTML
                        //.passwordParameter(PASSWORD) // Xác định tên của các trường PASSWORD trong biểu mẫu HTML
                        //.defaultSuccessUrl(DEFAULT_SUCCESS_URL)
                ) // URL mặc định sau khi đăng nhập thành công
                .logout(logout -> logout
                        .logoutUrl(LOGOUT_URL) // URL để xử lý quá trình đăng xuất
                        .logoutSuccessUrl(LOGIN_URL) // URL mặc định sau khi đăng xuất thành công
                        .invalidateHttpSession(true) // Hủy bỏ phiên làm việc của người dùng sau khi đăng xuất
                        .clearAuthentication(true)
                        .deleteCookies("access_token")
                        .deleteCookies("refresh_token")
                        .addLogoutHandler(logoutHandler))// Xóa thông tin xác thực của người dùng sau khi đăng xuất
                .sessionManagement(session -> session
                        .sessionCreationPolicy(STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;
        return http.build();
    }

    private CorsConfiguration getCorsConfiguration() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(allowedOrigins.split(",")));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        return configuration;
    }

}
