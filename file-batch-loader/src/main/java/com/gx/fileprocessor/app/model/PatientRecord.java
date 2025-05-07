package com.gx.fileprocessor.app.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity          									//  Maps this class to a DB table
@Data												//  Getters and Setters
@Table(name = "patient_records")					// 	Table name in postGreSQL
public class PatientRecord {

	@Id												// marks this "id" field as the primary key of the entity
	@GeneratedValue(strategy = GenerationType.IDENTITY)             // 	Auto-generates unique ID
	private Long id;
	
	@JsonProperty("patientId")
	@Column(name = "patient_id", nullable = false)
	private String patientId;
	
	private String name;
	
	private int age;
	
	private String condition;
	
    @JsonProperty("lastVisitDate")
    @JsonFormat(pattern = "dd-MM-yyyy")
	@Column(name = "last_visit_date")
	private LocalDate lastVisitDate;
	
    @JsonProperty("isInsured")
	@Column(name = "is_insured")
	private boolean isInsured;
	
    @JsonProperty("pharmacyName")
	@Column(name = "pharmacy_name")
	private String pharmacyName;
	
	@Column(name = "status")
	private String status;
	
    @JsonProperty("sourceFilename")
	@Column(name = "source_filename")
	private String sourceFilename;

    
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public LocalDate getLastVisitDate() {
		return lastVisitDate;
	}

	public void setLastVisitDate(LocalDate lastVisitDate) {
		this.lastVisitDate = lastVisitDate;
	}

	public boolean isInsured() {
		return isInsured;
	}

	public void setInsured(boolean isInsured) {
		this.isInsured = isInsured;
	}

	public String getPharmacyName() {
		return pharmacyName;
	}

	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSourceFilename() {
		return sourceFilename;
	}

	public void setSourceFilename(String sourceFilename) {
		this.sourceFilename = sourceFilename;
	}

	
	
}
