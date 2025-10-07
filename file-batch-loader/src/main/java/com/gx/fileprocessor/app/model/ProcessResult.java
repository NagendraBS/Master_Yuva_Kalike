package com.gx.fileprocessor.app.model;

import java.util.*;

public class ProcessResult {

	 private List<PatientRecord> records;
	    private int successCount;
	    private int failedCount;

	    public ProcessResult(List<PatientRecord> records, int successCount, int failedCount) {
	        this.records = records;
	        this.successCount = successCount;
	        this.failedCount = failedCount;
	    }

	    public List<PatientRecord> getRecords() {
	        return records;
	    }

	    public void setRecords(List<PatientRecord> records) {
	        this.records = records;
	    }

	    public int getSuccessCount() {
	        return successCount;
	    }

	    public void setSuccessCount(int successCount) {
	        this.successCount = successCount;
	    }

	    public int getFailedCount() {
	        return failedCount;
	    }

	    public void setFailedCount(int failedCount) {
	        this.failedCount = failedCount;
	    }
	
}
