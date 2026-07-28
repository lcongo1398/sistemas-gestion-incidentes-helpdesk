package com.utm.actividad8_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${FRONTEND_URL:}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (frontendUrl == null || frontendUrl.isBlank()) {
            // no FRONTEND_URL configured -> allow all origins (temporary for debugging)
            registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        } else {
            registry.addMapping("/**").allowedOrigins(frontendUrl).allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        }
    }
}
