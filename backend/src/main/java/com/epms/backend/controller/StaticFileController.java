package com.epms.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "*")
public class StaticFileController {

    private final ResourceLoader resourceLoader;

    public StaticFileController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            // Try to load from classpath first
            Resource resource = resourceLoader.getResource("classpath:static/uploads/" + filename);
            
            if (!resource.exists()) {
                // Try to load from file system
                Path filePath = Paths.get("src/main/resources/static/uploads/" + filename);
                if (Files.exists(filePath)) {
                    resource = resourceLoader.getResource("file:" + filePath.toAbsolutePath().toString());
                } else {
                    return ResponseEntity.notFound().build();
                }
            }

            // Determine content type
            String contentType = Files.probeContentType(Paths.get(filename));
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/test-uploads")
    public ResponseEntity<String> testUploads() {
        try {
            Path uploadsDir = Paths.get("src/main/resources/static/uploads/");
            if (Files.exists(uploadsDir)) {
                StringBuilder sb = new StringBuilder("Upload directory exists at: " + uploadsDir.toAbsolutePath() + "\n\nFiles:\n");
                Files.list(uploadsDir).forEach(file -> sb.append("- ").append(file.getFileName()).append("\n"));
                return ResponseEntity.ok(sb.toString());
            } else {
                return ResponseEntity.ok("Upload directory does not exist at: " + uploadsDir.toAbsolutePath());
            }
        } catch (IOException e) {
            return ResponseEntity.ok("Error checking upload directory: " + e.getMessage());
        }
    }
}