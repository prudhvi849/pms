package com.vts.pfms.print.model;

import java.io.File;
import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "committee_project_briefing_frozen")
public class CommitteeProjectBriefingFrozen implements Serializable 
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long FrozenBriefingId;
	private long ScheduleId;
	private long FreezeByEmpId; 
	private String FreezeTime;
	private String FrozenBriefingPath;
	private String BriefingFileName;
	private int IsActive;
	private String PresentationName;
	private String MoM;
	
	@Transient
	private File BriefingFile;
	
	
	@Transient
	private String MeetingId;
	@Transient
	private String LabCode;
	
	@Transient
	private File momFile;
	
	@Transient
	private MultipartFile BriefingFileMultipart;
	
	@Transient
	private MultipartFile PresentationNameMultipart;
	
	@Transient
	private MultipartFile MomMultipart;
	
	
}
