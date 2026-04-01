package com.example.clinic.Controller;

import com.example.clinic.model.MedicalHistory;
import com.example.clinic.Service.MedicalHistoryService;
import com.example.clinic.Service.PatientService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients/{patientId}/history")
public class MedicalHistoryController {

  private final MedicalHistoryService historyService;
  private final PatientService patientService;

  public MedicalHistoryController(MedicalHistoryService historyService, PatientService patientService) {
    this.historyService = historyService;
    this.patientService = patientService;
  }

  // GET /patients/{id}/history
  @GetMapping
  public ResponseEntity<?> list(@PathVariable Long patientId) {
    if (!patientService.exists(patientId)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
    }
    List<MedicalHistory> list = historyService.listByPatient(patientId);
    return ResponseEntity.ok(list);
  }

  // POST /patients/{id}/history
  @PostMapping
  public ResponseEntity<?> add(@PathVariable Long patientId, @RequestBody MedicalHistory body) {
    return historyService.add(patientId, body)
        .<ResponseEntity<?>>map(mh -> ResponseEntity.status(HttpStatus.CREATED).body(mh))
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found"));
  }
}
