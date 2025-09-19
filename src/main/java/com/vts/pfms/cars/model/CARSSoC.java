package com.vts.pfms.cars.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="pfms_cars_soc")
public class CARSSoC implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long CARSSoCId;
	private long CARSInitiationId;
	private String SoOUpload;
	private String FRUpload;
	private String SoCDate;
	private String SoCAmount;
	private String SoCDuration;
	private String Alignment;
	private String TimeReasonability;
	private String CostReasonability;
	private String RSPSelection;
	private String ExecutionPlan;
	private String SoCCriterion;
	private String MoMUpload;
	private String DPCIntroduction;
	private String DPCExpenditure;
	private String DPCAdditional;
	private String DPCApprovalSought;
	private String CreatedBy;
	private String CreatedDate;
	private String ModifiedBy;
	private String ModifiedDate;
	private int IsActive;

}
