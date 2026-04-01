package com.example.clinic.Controller;

import com.example.clinic.model.Patient;
import com.example.clinic.Service.PatientService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {

  private final PatientService patientService;

  public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }

  // POST /patients → register new patient
  @PostMapping
  public ResponseEntity<?> create(@RequestBody Patient body) {
    Optional<Patient> saved = patientService.create(body);
    return saved.<ResponseEntity<?>>map(p -> ResponseEntity.status(HttpStatus.CREATED).body(p))
                .orElseGet(() -> ResponseEntity.badRequest().body("Invalid user.id or missing user"));
  }

  // GET /patients/{id}
  @GetMapping("/{id}")
  public ResponseEntity<?> get(@PathVariable Long id) {
    return patientService.get(id)
        .<ResponseEntity<?>>map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found"));
  }

  // PUT /patients/{id}
  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Patient body) {
    return patientService.update(id, body)
        .<ResponseEntity<?>>map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found"));
  }
}
