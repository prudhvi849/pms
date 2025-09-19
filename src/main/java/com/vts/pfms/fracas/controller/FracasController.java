package com.vts.pfms.fracas.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.vts.pfms.fracas.dto.PfmsFracasAssignDto;
import com.vts.pfms.fracas.dto.PfmsFracasMainDto;
import com.vts.pfms.fracas.dto.PfmsFracasSubDto;
import com.vts.pfms.fracas.model.PfmsFracasAttach;
import com.vts.pfms.fracas.service.FracasServiceImpl;
import com.vts.pfms.utils.InputValidator;

@Controller
public class FracasController {

	private static final Logger logger=LogManager.getLogger(FracasController.class);
	@Autowired FracasServiceImpl service;
	
	@Value("${File_Size}")
	String file_size;
	
	@Value("${ApplicationFilesDrive}")
	String uploadpath;
	
	private String redirectWithError(RedirectAttributes redir,String redirURL, String message) {
	    redir.addAttribute("resultfail", message);
	    return "redirect:/"+redirURL;
	}
	
	@RequestMapping(value = "FracasMainItemsList.htm")
	public String FracasMainItemsList(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir) //,@RequestPart("FileAttach") MultipartFile[] FileAttach
	{
		String UserId = (String) ses.getAttribute("Username");
		String LabCode = (String)ses.getAttribute("labcode");
		logger.info(new Date() +"Inside FracasMainItemsList.htm "+UserId);
		try
		{
			String EmpId = ((Long) ses.getAttribute("EmpId")).toString();
			String Logintype= (String)ses.getAttribute("LoginType");
			String projectid=req.getParameter("projectid");
			List<Object[]> projectslist=service.LoginProjectDetailsList(EmpId,Logintype,LabCode);
			
			if(projectslist.size()==0) {
				
				redir.addAttribute("resultfail", "No Project is Assigned to you.");

				return "redirect:/MainDashBoard.htm";
			}
			
			
			if(projectid==null)  {
				Map md=model.asMap();
				projectid=(String)md.get("projectid");
			}
			if(projectid==null)
			{
				projectid=projectslist.get(0)[0].toString();
			}
			req.setAttribute("projectid",projectid);
			req.setAttribute("projectmainitemslist",service.ProjectFracasItemsList(projectid, LabCode));
			req.setAttribute("projectlist",projectslist);
			req.setAttribute("LabCode", LabCode);
			return "fracas/FracasMainItemsList";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasMainItemsList.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasMainAdd.htm")
	public String FracasMainAdd(HttpServletRequest req, HttpSession ses, RedirectAttributes redir) //,@RequestPart("FileAttach") MultipartFile[] FileAttach
	{
		String UserId = (String) ses.getAttribute("Username");
		String Logintype= (String)ses.getAttribute("LoginType");
		String LabCode = (String)ses.getAttribute("labcode");
		String EmpId = ((Long) ses.getAttribute("EmpId")).toString();
		logger.info(new Date() +"Inside FracasMainAdd.htm "+UserId);
		try
		{
			req.setAttribute("projectid",req.getParameter("projectid"));
			req.setAttribute("projectlist", service.ProjectsList( EmpId, Logintype,  LabCode));
			req.setAttribute("fracastypelist", service.FracasTypeList());
			req.setAttribute("filesize",file_size);
			return "fracas/FracasMainNew";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasMainAdd.htm "+UserId,e);
			return "static/Error";
		}
	}	
	
	
private boolean isValidFileType(MultipartFile file) {
		
		
		
		
	    if (file == null || file.isEmpty()) {
	        return true; // nothing uploaded, so it's valid
	    }

	    String contentType = file.getContentType();
	    String originalFilename = file.getOriginalFilename();
	    
	  
	    if (contentType == null) {
	        return false;
	    }
	    
	 // Extract extension in lowercase
	    String extension = FilenameUtils.getExtension(originalFilename).toLowerCase();
	    
	 // Check mapping between MIME type and extension
	    switch (extension) {
	        case "pdf":
	            return contentType.equalsIgnoreCase("application/pdf");
	        case "jpeg":
	        case "jpg":
	            return contentType.equalsIgnoreCase("image/jpeg");
	        case "png":
	            return contentType.equalsIgnoreCase("image/png");
	        default:
	            return false;
	    }

//	    // Allow only images and PDF
//	 // Allowed MIME types
//	    boolean validMime = contentType.equalsIgnoreCase("application/pdf")
//	            || contentType.equalsIgnoreCase("image/jpeg")
//	            || contentType.equalsIgnoreCase("image/png");
//
//	    // Allowed extensions
//	    boolean validExtension = extension.equals("pdf")
//	            || extension.equals("jpeg")
//	            || extension.equals("jpg")
//	            || extension.equals("png");
//
//	    return validMime && validExtension;
	}


	
	
	
	
	@RequestMapping(value = "FracasMainAddSubmit.htm")
	public String FracasMainAddSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir,@RequestPart("attachment") MultipartFile FileAttach) 
	{
		String UserId = (String) ses.getAttribute("Username");
		String LabCode =(String) ses.getAttribute("labcode");
		logger.info(new Date() +"Inside FracasMainAddSubmit.htm "+UserId);
		try
		{
			
			// 🔹 Validate file types
	        if (!isValidFileType(FileAttach) ) {

	            return redirectWithError(redir, "FracasMainItemsList.htm?projectid=" + req.getParameter("projectid"),
	                    "Invalid file type. Only PDF or Image files are allowed.");
	        }
			
			
			if(InputValidator.isContainsHTMLTags(req.getParameter("fracasitem"))){
				return redirectWithError(redir, "FracasMainItemsList.htm", "HTML tags are not permitted.");				
			}
			
			PfmsFracasMainDto dto=new PfmsFracasMainDto();
			dto.setFracasMainAttach(FileAttach);
			dto.setFracasItem(req.getParameter("fracasitem"));
			dto.setFracasTypeId(req.getParameter("fracastypeid"));
			dto.setProjectId(req.getParameter("projectid"));
			dto.setFracasDate(req.getParameter("date"));
			dto.setCreatedBy(UserId);
			dto.setLabCode(LabCode);
			
			long count=service.FracasMainAddSubmit(dto);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Item Added Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Item Add Unsuccessful");	
			}
			
			redir.addFlashAttribute("projectid",req.getParameter("projectid"));
			return "redirect:/FracasMainItemsList.htm";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasMainAddSubmit.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasAttachDownload.htm", method = RequestMethod.POST)
	public void TccAgendaAttachDownload(HttpServletRequest req, HttpSession ses, HttpServletResponse res)
			throws Exception 
	{
		String UserId = (String) ses.getAttribute("Username");
		String LabCode =(String) ses.getAttribute("labcode");
		logger.info(new Date() +"Inside FracasAttachDownload.htm "+UserId);
		try
		{
			res.setContentType("Application/octet-stream");	
			
			PfmsFracasAttach attachment = service.FracasAttachDownload(req.getParameter("fracasattachid"));
			Path uploadPath = Paths.get(uploadpath,LabCode,"FracasData",attachment.getAttachName().toString());
			File my_file=uploadPath.toFile();
//			my_file = new File(uploadpath+attachment.getFilePath()+File.separator+attachment.getAttachName()); 
	        res.setHeader("Content-disposition","attachment; filename="+attachment.getAttachName().toString()); 
	        OutputStream out = res.getOutputStream();
	        FileInputStream in = new FileInputStream(my_file);
	        byte[] buffer = new byte[4096];
	        int length;
	        while ((length = in.read(buffer)) > 0){
	           out.write(buffer, 0, length);
	        }
	        in.close();
	        out.flush();
	        out.close();
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(new Date() +"Inside FracasAttachDownload.htm "+UserId,e);
			
		}
	}
	
	
	@RequestMapping(value = "FracasAssign.htm")
	public String FracasAssign(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir) 
	{
		String UserId = (String) ses.getAttribute("Username");
		String LabCode =(String) ses.getAttribute("labcode");
		logger.info(new Date() +"Inside FracasAssign.htm "+UserId);
		
	
		try
		{
			String fracasmainid=req.getParameter("fracasmainid");
			String EmpId = ((Long) ses.getAttribute("EmpId")).toString();
			if(fracasmainid==null)  {
				Map md=model.asMap();
				fracasmainid=(String)md.get("fracasmainid");
			}
			
			Object[] fracasitemdata=service.FracasItemData(fracasmainid);
			
			req.setAttribute("fracasitemdata",fracasitemdata);
			req.setAttribute("employeelist",service.EmployeeList(LabCode));
			req.setAttribute("fracasassignedlist",service.FracasAssignedList(EmpId,fracasmainid));
			req.setAttribute("filesize",file_size);
			req.setAttribute("LabCode", LabCode);/*Line added*/
			return "fracas/FracasItemAssign";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasAssign.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasAssignSubmit.htm")
	public String FracasAssignSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir) 
	{
		String UserId = (String) ses.getAttribute("Username");
		String EmpId = ((Long) ses.getAttribute("EmpId")).toString();
		
		String Labcode=req.getParameter("LabCode");

		logger.info(new Date() +"Inside FracasAssignSubmit.htm "+UserId);
		try
		{
			if(InputValidator.isContainsHTMLTags(req.getParameter("remarks"))){
				redir.addFlashAttribute("fracasmainid",req.getParameter("fracasmainid"));
				return redirectWithError(redir, "FracasAssign.htm", "HTML tags are not permitted.");				
			}
			String fracasmainid=req.getParameter("fracasmainid");
			//Object[] fracasitemdata=service.FracasItemData(fracasmainid);
						
			PfmsFracasAssignDto dto=new PfmsFracasAssignDto();
			dto.setAssignee(req.getParameterValues("employeeid"));
			dto.setAssigner(EmpId);
			dto.setFracasMainId(fracasmainid);
			dto.setPDC(req.getParameter("pdc"));
			dto.setRemarks(req.getParameter("remarks"));
			dto.setCreatedBy(UserId);
			dto.setLabCode(Labcode);
			long count=service.FracasAssignSubmit(dto);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Assigned Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Assign Unsuccessful");	
			}
			
			redir.addFlashAttribute("fracasmainid",fracasmainid);
			return "redirect:/FracasAssign.htm";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasAssignSubmit.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasAssigneeList.htm")
	public String FracasAssigneeList(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir) 
	{
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasAssigneeList.htm "+UserId);
		try
		{
			String EmpId = ((Long) ses.getAttribute("EmpId")).toString();					
			List<Object[]> fracasassigneelist=service.FracasAssigneeList(EmpId);						
			req.setAttribute("fracasassigneelist",fracasassigneelist);
			return "fracas/FracasAssigneeList";
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(new Date() +"Inside FracasAssigneeList.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasAssignDetails.htm")
	public String FracasSubLaunch(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir)
			throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasAssignDetails.htm "+UserId);		
		try {
			String fracasassignid=req.getParameter("fracasassignid");
			if(fracasassignid==null)  {
				Map md=model.asMap();
				fracasassignid=(String)md.get("fracasassignid");
			}	
			req.setAttribute("fracasassigndata", service.FracasAssignData(fracasassignid));
			req.setAttribute("fracassublist", service.FracasSubList(fracasassignid) );
			req.setAttribute("filesize",file_size);
			return "fracas/FracasAssigneeUpdate";
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(new Date() +" Inside FracasAssignDetails.htm "+UserId, e);
			return "static/Error";
		}
		
	}
	
	
	
	@RequestMapping(value = "FracasSubSubmit.htm")
	public String FracasSubSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir ,@RequestPart("FileAttach") MultipartFile FileAttach) 
	{
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasSubSubmit.htm "+UserId);
		try
		{
			
			String labCode  = (String)ses.getAttribute("labcode");
			String fracasassignid=req.getParameter("fracasassignid");
			//Object[] fracasitemdata=service.FracasItemData(fracasmainid);
			if(InputValidator.isContainsHTMLTags(req.getParameter("Remarks"))){
				redir.addFlashAttribute("fracasassignid",fracasassignid);
				return redirectWithError(redir, "FracasAssignDetails.htm", "HTML tags are not permitted.");				
			}
			
			// 🔹 Validate file types
	        if (!isValidFileType(FileAttach) ) {

	            return redirectWithError(redir, "FracasAssignDetails.htm?fracasassignid=" + fracasassignid,
	                    "Invalid file type. Only PDF or Image files are allowed.");
	        }

			
			
						
			PfmsFracasSubDto dto=new PfmsFracasSubDto();
			dto.setFracasAssignId(fracasassignid);
			dto.setProgress(req.getParameter("Progress"));
			dto.setRemarks(req.getParameter("Remarks"));
			dto.setProgressDate(req.getParameter("asondate"));
			dto.setCreatedBy(UserId);
			dto.setAttachment(FileAttach);
			dto.setLabCode(labCode);
			long count=0;
			
			
			count=service.FracasSubSubmit(dto);
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Details Added Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Details Add Unsuccessful");	
			}
			
			redir.addFlashAttribute("fracasassignid",fracasassignid);
			return "redirect:/FracasAssignDetails.htm";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasSubSubmit.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasAssigneeForward.htm", method = RequestMethod.POST)
	public String FracasAssigneeForward(HttpServletRequest req, HttpSession ses, RedirectAttributes redir)
			throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasAssigneeForward.htm "+UserId);		
		try {
			String fracasassignid=req.getParameter("fracasassignid");
			PfmsFracasAssignDto dto=new PfmsFracasAssignDto();
			dto.setFracasAssignId(fracasassignid);
			dto.setFracasStatus("F");
			dto.setRemarks(req.getParameter("remarks"));
			dto.setModifiedBy(UserId);
			dto.setIsActive("1");
			int count=0;
			count=service.FracasAssignForwardUpdate(dto);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Assigned Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Assign Unsuccessful");	
			}
			return "redirect:/FracasAssigneeList.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasAssigneeForward.htm "+UserId, e);
				return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasToReviewList.htm")
	public String FracasToReviewList(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir) 
	{
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasAssigneeList.htm "+UserId);
		try
		{
			String EmpId = ((Long) ses.getAttribute("EmpId")).toString();					
			List<Object[]> fracastoreviewlist=service.FracasToReviewList(EmpId);						
			req.setAttribute("fracastoreviewlist",fracastoreviewlist);
			return "fracas/FracasToReviewList";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasAssigneeList.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasToReviewDetails.htm")
	public String FracasToReviewDetails(Model model,HttpServletRequest req, HttpSession ses, RedirectAttributes redir)throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasToReviewDetails.htm "+UserId);		
		try {
			String fracasassignid=req.getParameter("fracasassignid");
			if(fracasassignid==null)  {
				Map md=model.asMap();
				fracasassignid=(String)md.get("fracasassignid");
			}
			String forceclose=req.getParameter("forceclose");
			
			
			req.setAttribute("forceclose", forceclose);
			req.setAttribute("fracasassigndata", service.FracasAssignData(fracasassignid));
			req.setAttribute("fracassublist", service.FracasSubList(fracasassignid) );
			return "fracas/FracasToReviewDetails";
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(new Date() +" Inside FracasToReviewDetails.htm "+UserId, e);
			return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasSendBackSubmit.htm", method = RequestMethod.POST)
	public String FracasSendBackSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir)
			throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasSendBackSubmit.htm "+UserId);		
		try {
			if(InputValidator.isContainsHTMLTags(req.getParameter("Remarks"))){
				return redirectWithError(redir, "FracasToReviewList.htm", "HTML tags are not permitted.");				
			}
			String fracasassignid=req.getParameter("fracasassignid");
			PfmsFracasAssignDto dto=new PfmsFracasAssignDto();
			dto.setFracasAssignId(fracasassignid);
			dto.setFracasStatus("B");
			dto.setRemarks(req.getParameter("Remarks"));
			dto.setModifiedBy(UserId);
			dto.setIsActive("1");
			int count=0;
			count=service.FracasAssignForwardUpdate(dto);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Send Back Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Send Back Unsuccessful");	
			}
			return "redirect:/FracasToReviewList.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasSendBackSubmit.htm "+UserId, e);
				return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasCloseSubmit.htm", method = RequestMethod.POST)
	public String FracasCloseSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir)
			throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasCloseSubmit.htm "+UserId);		
		try {
			if(InputValidator.isContainsHTMLTags(req.getParameter("Remarks"))){
				return redirectWithError(redir, "FracasToReviewList.htm", "HTML tags are not permitted.");				
			}
			String fracasassignid=req.getParameter("fracasassignid");
			PfmsFracasAssignDto dto=new PfmsFracasAssignDto();
			dto.setFracasAssignId(fracasassignid);
			dto.setFracasStatus("Y");
			dto.setRemarks(req.getParameter("Remarks"));
			dto.setModifiedBy(UserId);
			dto.setIsActive("0");
			int count=0;
			count=service.FracasAssignForwardUpdate(dto);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Item Closed Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Item Closing Unsuccessful");	
			}
			return "redirect:/FracasToReviewList.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasCloseSubmit.htm "+UserId, e);
				return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasSubDelete.htm", method = RequestMethod.POST)
	public String FracasSubDelete(HttpServletRequest req, HttpSession ses, RedirectAttributes redir)throws Exception {
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasSubDelete.htm "+UserId);		
		try {
			String fracasassignid=req.getParameter("fracasassignid");
			String fracassubid=req.getParameter("fracassubid");
			String fracasattachid=req.getParameter("fracasattachid");
			
			int count=0;
			count=service.FracasSubDelete(fracassubid,fracasattachid);
			
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Data Deleted Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Data Delete Unsuccessful");	
			}
			redir.addFlashAttribute("fracasassignid",fracasassignid);
			return "redirect:/FracasAssignDetails.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasSubDelete.htm "+UserId, e);
				return "static/Error";
		}
	}
	
	
	@RequestMapping(value = "FracasMainDelete.htm", method = RequestMethod.POST)
	public String FracasMainDelete(HttpServletRequest req, HttpSession ses, RedirectAttributes redir)throws Exception 
	{
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasMainDelete.htm "+UserId);		
		try {
			String fracasmainid=req.getParameter("fracasmainid");
			String projectid=req.getParameter("projectid");
			PfmsFracasMainDto dto=new PfmsFracasMainDto();
			int count=0;
			dto.setFracasMainId(fracasmainid);
			dto.setModifiedBy(UserId);
			count=service.FracasMainDelete(dto);
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Item Closed Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Item Closing Unsuccessful");	
			}
			redir.addFlashAttribute("projectid",projectid);
			return "redirect:/FracasMainItemsList.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasMainDelete.htm "+UserId, e);
				return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasMainItemEdit.htm")
	public String FracasMainItemEdit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir) 
	{
		String UserId = (String) ses.getAttribute("Username");
		String Logintype= (String)ses.getAttribute("LoginType");
		String LabCode = (String)ses.getAttribute("labcode");
		String EmpId = ((Long) ses.getAttribute("EmpId")).toString();
		logger.info(new Date() +"Inside FracasMainItemEdit.htm "+UserId);
		try
		{
			String fracasmainid=req.getParameter("fracasmainid");
						
			Object[] fracasitemdata=service.FracasItemData(fracasmainid);
			req.setAttribute("fracasitemdata", fracasitemdata);
			req.setAttribute("projectlist", service.ProjectsList(EmpId, Logintype, LabCode));
			req.setAttribute("fracastypelist", service.FracasTypeList());
			req.setAttribute("filesize",file_size);
			return "fracas/FracasMainItemEdit";
		}catch (Exception e) {
			e.printStackTrace(); 
			logger.error(new Date() +"Inside FracasMainItemEdit.htm "+UserId,e);
			return "static/Error";
		}
	}
	
	@RequestMapping(value = "FracasMainEditSubmit.htm", method = RequestMethod.POST)
	public String FracasMainEditSubmit(HttpServletRequest req, HttpSession ses, RedirectAttributes redir,@RequestPart("attachment") MultipartFile FileAttach) throws Exception 
	{
		String LabCode = (String)ses.getAttribute("labcode");
		String UserId = (String) ses.getAttribute("Username");
		logger.info(new Date() +"Inside FracasMainEditSubmit.htm "+UserId);		
		try {
			if(InputValidator.isContainsHTMLTags(req.getParameter("fracasitem"))){
				return redirectWithError(redir, "FracasMainItemsList.htm", "HTML tags are not permitted.");				
			}
			
			PfmsFracasMainDto dto=new PfmsFracasMainDto();
			
			// 🔹 Validate file types
	        if (!isValidFileType(FileAttach) ) {

	            return redirectWithError(redir, "FracasMainItemsList.htm?projectid=" + req.getParameter("projectid"),
	                    "Invalid file type. Only PDF or Image files are allowed.");
	        }
			
			
			
			
			dto.setProjectId(req.getParameter("projectid"));
			dto.setFracasTypeId(req.getParameter("fracastypeid"));
			dto.setFracasMainAttach(FileAttach);
			dto.setFracasDate(req.getParameter("date"));
			dto.setFracasItem(req.getParameter("fracasitem"));
			dto.setFracasMainId(req.getParameter("fracasmainid"));
			dto.setModifiedBy(UserId);
			dto.setLabCode(LabCode);
			dto.setFracasMainAttachId(req.getParameter("fracasmainattachid"));
			int count=0;
			count=service.FracasMainEdit(dto);
			if (count > 0) {
				redir.addAttribute("result", "FRACAS Item Updated Successfully");
			} else {
				redir.addAttribute("resultfail", "FRACAS Item Update Unsuccessful");	
			}
			redir.addFlashAttribute("projectid",dto.getProjectId());
			return "redirect:/FracasMainItemsList.htm";
		}catch (Exception e) {
				e.printStackTrace();
				logger.error(new Date() +" Inside FracasMainEditSubmit.htm "+UserId, e);
				return "static/Error";
		}
	}
	
}
