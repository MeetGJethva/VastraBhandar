package com.backend.backend.config;

import com.backend.backend.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    private MyUserDetailsService userDetailsService;

    @Autowired
    public SecurityConfig(MyUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Access-Control-Allow-Origin"));
//        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000/"));
//        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
//        corsConfiguration.setAllowCredentials(true);
//        corsConfiguration.setExposedHeaders(List.of("Authorization"));

        // Enable CORS
        http.cors(Customizer.withDefaults());

        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/users/signup").permitAll()
                        .requestMatchers("/api/users/login").permitAll()
                        .requestMatchers("/api/users/").permitAll()
                        .requestMatchers("/api/vendors/categories").permitAll()
                        // Allow read (GET) for all on /api/vendors/products
                        .requestMatchers(HttpMethod.GET, "/api/vendors/products").permitAll()
                        // Only Designers can read and write (GET, POST, PUT, DELETE) on /api/vendors/products
                        .requestMatchers(HttpMethod.POST, "/api/vendors/products").hasRole("DESIGNER")
                        .requestMatchers(HttpMethod.PUT, "/api/vendors/products").hasRole("DESIGNER")
                        .requestMatchers(HttpMethod.DELETE, "/api/vendors/products").hasRole("DESIGNER")
//                        .requestMatchers("/api/vendors/**").hasRole("FACTORY_OWNER")
//                        .requestMatchers("/api/vendors/product/**").hasRole("DESIGNER")
//                        .requestMatchers("/api/designers/**").hasRole("DESIGNER")
//                        .requestMatchers("/api/customers/**").hasRole("CUSTOMER")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    // CORS configuration
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Allow requests from this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
