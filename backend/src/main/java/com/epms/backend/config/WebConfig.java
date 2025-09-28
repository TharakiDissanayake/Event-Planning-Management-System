package com.epms.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get the absolute path to the uploads directory
        String uploadsPath = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";
        
        // Serve uploaded files from the uploads directory
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("classpath:/static/uploads/")
                .addResourceLocations("file:" + uploadsPath)
                .addResourceLocations("file:src/main/resources/static/uploads/")
                .addResourceLocations("file:./src/main/resources/static/uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // CORS for uploads
        registry.addMapping("/uploads/**")
                .allowedOrigins("*")
                .allowedMethods("GET")
                .allowCredentials(false);
        
        // CORS for all endpoints - allow all origins to match controller annotations
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}