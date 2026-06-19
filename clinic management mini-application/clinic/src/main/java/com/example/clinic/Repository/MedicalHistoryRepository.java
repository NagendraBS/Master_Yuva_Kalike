package com.example.clinic.Repository;

import com.example.clinic.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {
  List<MedicalHistory> findByPatient_IdOrderByRecordDateDesc(Long patientId);
}
