package com.example.clinic.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.clinic.Repository.PatientRepository;
import com.example.clinic.Repository.UserRepository;
import com.example.clinic.model.Patient;
import com.example.clinic.model.User;

@Service
public class PatientService {

  private final PatientRepository patientRepo;
  private final UserRepository userRepo;

  public PatientService(PatientRepository patientRepo, UserRepository userRepo) {
    this.patientRepo = patientRepo;
    this.userRepo = userRepo;
  }

  public Optional<Patient> create(Patient input) {
    // require input.user.id
    if (input.getUser() == null || input.getUser().getId() == null) return Optional.empty();
    Optional<User> u = userRepo.findById(input.getUser().getId());
    if (u.isEmpty()) return Optional.empty();
    input.setUser(u.get());
    return Optional.of(patientRepo.save(input));
  }

  public Optional<Patient> get(Long id) {
    return patientRepo.findById(id);
  }

  public Optional<Patient> update(Long id, Patient update) {
    return patientRepo.findById(id).map(p -> {
      p.setFirstName(update.getFirstName());
      p.setLastName(update.getLastName());
      p.setDob(update.getDob());
      p.setGender(update.getGender());
      p.setContactInfo(update.getContactInfo());
      p.setAddress(update.getAddress());
      p.setPatientType(update.getPatientType());

      if (update.getUser() != null && update.getUser().getId() != null) {
        userRepo.findById(update.getUser().getId()).ifPresent(p::setUser);
      }
      return patientRepo.save(p);
    });
  }

  public boolean exists(Long id) {
    return patientRepo.existsById(id);
  }
}
