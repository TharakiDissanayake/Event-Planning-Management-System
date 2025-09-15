package com.epms.backend.advisor;

import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AdvisorExceptionHandler {
    public ResponseEntity<StandardResponse> handleNotFoundException(NotFoundException e){
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(404, "error", e.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }
}
