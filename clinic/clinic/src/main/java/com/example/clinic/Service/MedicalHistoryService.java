package com.example.clinic.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.clinic.Repository.MedicalHistoryRepository;
import com.example.clinic.Repository.PatientRepository;
import com.example.clinic.model.MedicalHistory;
import com.example.clinic.model.Patient;

@Service
public class MedicalHistoryService {

  private final MedicalHistoryRepository historyRepo;
  private final PatientRepository patientRepo;

  public MedicalHistoryService(MedicalHistoryRepository historyRepo, PatientRepository patientRepo) {
    this.historyRepo = historyRepo;
    this.patientRepo = patientRepo;
  }

  public List<MedicalHistory> listByPatient(Long patientId) {
    return historyRepo.findByPatient_IdOrderByRecordDateDesc(patientId);
  }

  public Optional<MedicalHistory> add(Long patientId, MedicalHistory input) {
    Optional<Patient> p = patientRepo.findById(patientId);
    if (p.isEmpty()) return Optional.empty();
    input.setPatient(p.get()); // enforce FK from path
    return Optional.of(historyRepo.save(input));
  }
}
